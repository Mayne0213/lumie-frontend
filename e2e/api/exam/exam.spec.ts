import { test, expect } from '@playwright/test';
import { LumieApiClient } from '../../utils/api-client';
import { createTestUser, TEST_TENANT_SLUG, createTestExam } from '../../fixtures/test-data';

// TODO: Backend issue - exam-svc returns 403 Forbidden
// gRPC call to tenant-svc for validation is failing
test.describe.skip('Exam - CRUD', () => {
  let client: LumieApiClient;

  test.beforeEach(async () => {
    client = new LumieApiClient();
    await client.init();
    client.setTenant(TEST_TENANT_SLUG);

    // Register user
    const user = createTestUser();
    const registerResponse = await client.register(user);
    expect(registerResponse.status).toBe(201);
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('should create a new exam', async () => {
    const exam = createTestExam();

    const response = await client.createExam(exam);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data.name).toBe(exam.name);
    expect(response.data.totalQuestions).toBe(exam.totalQuestions);
  });

  test('should get exam by id', async () => {
    const exam = createTestExam();
    const created = await client.createExam(exam);
    expect(created.status).toBe(201);

    const response = await client.getExam(created.data.id);

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(created.data.id);
    expect(response.data.name).toBe(exam.name);
  });

  test('should list all exams', async () => {
    const exam1 = createTestExam({ name: 'Math Exam' });
    const exam2 = createTestExam({ name: 'English Exam' });

    await client.createExam(exam1);
    await client.createExam(exam2);

    const response = await client.listExams();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThanOrEqual(2);
  });

  test('should delete exam', async () => {
    const exam = createTestExam();
    const created = await client.createExam(exam);
    expect(created.status).toBe(201);

    const deleteResponse = await client.deleteExam(created.data.id);
    expect(deleteResponse.status).toBe(204);

    // Verify deletion
    const getResponse = await client.getExam(created.data.id);
    expect(getResponse.status).toBe(404);
  });

  test('should fail with missing name', async () => {
    const exam = createTestExam({ name: '' });

    const response = await client.createExam(exam);

    expect(response.status).toBe(400);
  });

  test('should fail with invalid totalQuestions', async () => {
    const exam = createTestExam();
    (exam as any).totalQuestions = -1;

    const response = await client.createExam(exam);

    expect(response.status).toBe(400);
  });

  test('should fail to get non-existent exam', async () => {
    const response = await client.getExam(999999);

    expect(response.status).toBe(404);
  });
});

// TODO: Backend issue - depends on Exam CRUD working
test.describe.skip('Exam - Authorization', () => {
  let client: LumieApiClient;

  test.beforeEach(async () => {
    client = new LumieApiClient();
    await client.init();
    client.setTenant(TEST_TENANT_SLUG);
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('should fail to create exam without authentication', async () => {
    const exam = createTestExam();

    const response = await client.createExam(exam);

    expect([401, 403]).toContain(response.status);
  });

  test('should fail to list exams without authentication', async () => {
    const response = await client.listExams();

    expect([401, 403]).toContain(response.status);
  });
});
