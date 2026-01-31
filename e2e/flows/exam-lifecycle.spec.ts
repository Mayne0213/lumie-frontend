import { test, expect } from '@playwright/test';
import { LumieApiClient } from '../utils/api-client';
import {
  createTestUser,
  TEST_TENANT_SLUG,
  createTestAcademy,
  createTestStudent,
  createTestExam,
  createTestExamResult,
} from '../fixtures/test-data';

// TODO: Backend issue - depends on Exam and Student services working
test.describe.skip('E2E Flow: Exam Lifecycle', () => {
  let client: LumieApiClient;

  test.beforeEach(async () => {
    client = new LumieApiClient();
    await client.init();
    client.setTenant(TEST_TENANT_SLUG);
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('complete exam lifecycle: create exam, register students, submit results', async () => {
    // Step 1: Register user
    const user = createTestUser();
    await client.register(user);

    // Step 2: Create academy
    const academy = createTestAcademy();
    const academyResponse = await client.createAcademy(academy);
    expect(academyResponse.status).toBe(201);
    const academyId = academyResponse.data.id;

    // Step 3: Create multiple students
    const studentIds: number[] = [];
    const students = [
      createTestStudent(academyId, { name: 'Alice Kim' }),
      createTestStudent(academyId, { name: 'Bob Lee' }),
      createTestStudent(academyId, { name: 'Carol Park' }),
    ];

    for (const student of students) {
      const response = await client.createStudent(student);
      expect(response.status).toBe(201);
      studentIds.push(response.data.id);
    }

    // Step 4: Create an exam
    const exam = createTestExam({ name: 'Midterm Math Exam' });
    const examResponse = await client.createExam(exam);
    expect(examResponse.status).toBe(201);
    const examId = examResponse.data.id;

    // Step 5: Submit exam results for all students
    const results = [
      createTestExamResult(studentIds[0], { '1': 'A', '2': 'B', '3': 'C', '4': 'D', '5': 'A' }), // 100 points
      createTestExamResult(studentIds[1], { '1': 'A', '2': 'B', '3': 'C', '4': 'A', '5': 'B' }), // 60 points
      createTestExamResult(studentIds[2], { '1': 'B', '2': 'A', '3': 'C', '4': 'D', '5': 'A' }), // 60 points
    ];

    const submitResponse = await client.submitExamResults(examId, { results });
    expect(submitResponse.status).toBe(201);
    expect(submitResponse.data.length).toBe(3);

    // Step 6: Verify all results were recorded
    const resultsResponse = await client.getExamResults(examId);
    expect(resultsResponse.status).toBe(200);
    expect(resultsResponse.data.length).toBe(3);
  });

  test('multiple exams for same students', async () => {
    // Register user
    const user = createTestUser();
    await client.register(user);

    const academy = createTestAcademy();
    const academyResponse = await client.createAcademy(academy);
    const academyId = academyResponse.data.id;

    // Create student
    const student = createTestStudent(academyId, { name: 'Test Student' });
    const studentResponse = await client.createStudent(student);
    const studentId = studentResponse.data.id;

    // Create multiple exams
    const exams = [
      createTestExam({ name: 'Math Exam' }),
      createTestExam({ name: 'English Exam' }),
      createTestExam({ name: 'Science Exam' }),
    ];

    const examIds: number[] = [];
    for (const exam of exams) {
      const response = await client.createExam(exam);
      expect(response.status).toBe(201);
      examIds.push(response.data.id);
    }

    // Submit results for each exam
    for (const examId of examIds) {
      const result = createTestExamResult(studentId, {
        '1': 'A',
        '2': 'B',
        '3': 'C',
        '4': 'D',
        '5': 'A',
      });
      const response = await client.submitExamResults(examId, { results: [result] });
      expect(response.status).toBe(201);
    }

    // Verify results per exam
    for (const examId of examIds) {
      const results = await client.getExamResults(examId);
      expect(results.status).toBe(200);
      expect(results.data.length).toBe(1);
    }

    // Verify student has results for all exams
    const studentResults = await client.getStudentResults(studentId);
    expect(studentResults.status).toBe(200);
    expect(studentResults.data.length).toBe(3);
  });

  test('unauthorized access to exam results fails', async () => {
    // Register user
    const user = createTestUser();
    await client.register(user);

    const academy = createTestAcademy();
    const academyResponse = await client.createAcademy(academy);
    const academyId = academyResponse.data.id;

    const student = createTestStudent(academyId);
    const studentResponse = await client.createStudent(student);
    const studentId = studentResponse.data.id;

    const exam = createTestExam();
    const examResponse = await client.createExam(exam);
    const examId = examResponse.data.id;

    const result = createTestExamResult(studentId, { '1': 'A', '2': 'B', '3': 'C', '4': 'D', '5': 'A' });
    await client.submitExamResults(examId, { results: [result] });

    // Clear auth and try to access
    client.clearAuth();

    const resultsResponse = await client.getExamResults(examId);
    expect(resultsResponse.status).toBe(401);
  });
});
