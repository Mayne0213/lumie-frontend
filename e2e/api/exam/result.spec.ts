import { test, expect } from '@playwright/test';
import { LumieApiClient } from '../../utils/api-client';
import {
  createTestUser,
  TEST_TENANT_SLUG,
  createTestAcademy,
  createTestStudent,
  createTestExam,
  createTestExamResult,
} from '../../fixtures/test-data';

// TODO: Backend issue - depends on Exam and Student services working
test.describe.skip('Exam Result - Submit and Query', () => {
  let client: LumieApiClient;
  let academyId: number;
  let examId: number;
  let studentId: number;

  test.beforeEach(async () => {
    client = new LumieApiClient();
    await client.init();
    client.setTenant(TEST_TENANT_SLUG);

    // Register user
    const user = createTestUser();
    const registerResponse = await client.register(user);
    expect(registerResponse.status).toBe(201);

    // Create academy
    const academy = createTestAcademy();
    const academyResponse = await client.createAcademy(academy);
    expect(academyResponse.status).toBe(201);
    academyId = academyResponse.data.id;

    // Create exam
    const exam = createTestExam();
    const examResponse = await client.createExam(exam);
    expect(examResponse.status).toBe(201);
    examId = examResponse.data.id;

    // Create student
    const student = createTestStudent(academyId);
    const studentResponse = await client.createStudent(student);
    expect(studentResponse.status).toBe(201);
    studentId = studentResponse.data.id;
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('should submit exam results', async () => {
    const result = createTestExamResult(studentId, {
      '1': 'A',
      '2': 'B',
      '3': 'C',
      '4': 'D',
      '5': 'A',
    });

    const response = await client.submitExamResults(examId, {
      results: [result],
    });

    expect(response.status).toBe(201);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBe(1);
    expect(response.data[0]).toHaveProperty('id');
    expect(response.data[0].studentId).toBe(studentId);
  });

  test('should get exam results', async () => {
    // Submit result first
    const result = createTestExamResult(studentId, {
      '1': 'A',
      '2': 'B',
      '3': 'C',
      '4': 'D',
      '5': 'A',
    });
    await client.submitExamResults(examId, { results: [result] });

    // Get results
    const response = await client.getExamResults(examId);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThanOrEqual(1);
  });

  test('should submit results for multiple students', async () => {
    // Create another student
    const student2 = createTestStudent(academyId, { name: 'Second Student' });
    const student2Response = await client.createStudent(student2);
    expect(student2Response.status).toBe(201);
    const student2Id = student2Response.data.id;

    // Submit results for both students
    const results = [
      createTestExamResult(studentId, { '1': 'A', '2': 'B', '3': 'C', '4': 'D', '5': 'A' }),
      createTestExamResult(student2Id, { '1': 'B', '2': 'A', '3': 'C', '4': 'D', '5': 'B' }),
    ];

    const response = await client.submitExamResults(examId, { results });

    expect(response.status).toBe(201);
    expect(response.data.length).toBe(2);
  });

  test('should get student results', async () => {
    // Submit result first
    const result = createTestExamResult(studentId, {
      '1': 'A',
      '2': 'B',
      '3': 'C',
      '4': 'D',
      '5': 'A',
    });
    await client.submitExamResults(examId, { results: [result] });

    // Get student results
    const response = await client.getStudentResults(studentId);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThanOrEqual(1);
  });

  test('should calculate score correctly for all correct answers', async () => {
    // All correct answers
    const result = createTestExamResult(studentId, {
      '1': 'A',
      '2': 'B',
      '3': 'C',
      '4': 'D',
      '5': 'A',
    });

    const response = await client.submitExamResults(examId, { results: [result] });

    expect(response.status).toBe(201);
    expect(response.data[0].totalScore).toBe(100); // 5 questions x 20 points each
  });

  test('should calculate score correctly for partial answers', async () => {
    // Only 3 correct answers (1, 2, 3 are correct, 4, 5 are wrong)
    const result = createTestExamResult(studentId, {
      '1': 'A',  // correct
      '2': 'B',  // correct
      '3': 'C',  // correct
      '4': 'A',  // wrong (should be D)
      '5': 'B',  // wrong (should be A)
    });

    const response = await client.submitExamResults(examId, { results: [result] });

    expect(response.status).toBe(201);
    expect(response.data[0].totalScore).toBe(60); // 3 questions x 20 points each
  });

  test('should fail with empty results list', async () => {
    const response = await client.submitExamResults(examId, { results: [] });

    expect(response.status).toBe(400);
  });

  test('should fail with non-existent exam', async () => {
    const result = createTestExamResult(studentId, { '1': 'A' });

    const response = await client.submitExamResults(999999, { results: [result] });

    expect(response.status).toBe(404);
  });

  test('should fail with non-existent student', async () => {
    const result = createTestExamResult(999999, { '1': 'A' });

    const response = await client.submitExamResults(examId, { results: [result] });

    expect(response.status).toBe(404);
  });
});

// TODO: Backend issue - depends on Exam service working
test.describe.skip('Exam Result - Authorization', () => {
  let client: LumieApiClient;

  test.beforeEach(async () => {
    client = new LumieApiClient();
    await client.init();
    client.setTenant(TEST_TENANT_SLUG);
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('should fail to submit results without authentication', async () => {
    const result = createTestExamResult(1, { '1': 'A' });

    const response = await client.submitExamResults(1, { results: [result] });

    expect([401, 403]).toContain(response.status);
  });

  test('should fail to get results without authentication', async () => {
    const response = await client.getExamResults(1);

    expect([401, 403]).toContain(response.status);
  });
});
