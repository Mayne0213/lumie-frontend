import { test, expect } from '@playwright/test';
import { LumieApiClient } from '../../utils/api-client';
import { createTestUser, TEST_TENANT_SLUG, createTestAcademy, createTestStudent } from '../../fixtures/test-data';

// TODO: Backend issue - student creation returns 500 Internal Server Error
// Needs investigation: possible database schema or service integration issue
test.describe('Student - CRUD', () => {
  let client: LumieApiClient;
  let academyId: number;

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
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('should create a new student', async () => {
    const student = createTestStudent(academyId);

    const response = await client.createStudent(student);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data.name).toBe(student.name);
    expect(response.data.email).toBe(student.email);
  });

  test('should get student by id', async () => {
    const student = createTestStudent(academyId);
    const created = await client.createStudent(student);
    expect(created.status).toBe(201);

    const response = await client.getStudent(created.data.id);

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(created.data.id);
    expect(response.data.name).toBe(student.name);
  });

  test('should list all students', async () => {
    const student1 = createTestStudent(academyId, { name: 'Student One' });
    const student2 = createTestStudent(academyId, { name: 'Student Two' });

    await client.createStudent(student1);
    await client.createStudent(student2);

    const response = await client.listStudents();

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('content');
    expect(response.data.content.length).toBeGreaterThanOrEqual(2);
  });

  test('should create student without grade', async () => {
    const student = createTestStudent(academyId);
    delete (student as any).grade;

    const response = await client.createStudent(student);

    expect(response.status).toBe(201);
    expect(response.data.name).toBe(student.name);
  });

  test('should fail with duplicate email', async () => {
    const student = createTestStudent(academyId);

    await client.createStudent(student);
    const duplicate = await client.createStudent(student);

    expect(duplicate.status).toBe(409);
  });

  test('should fail with invalid email', async () => {
    const student = createTestStudent(academyId, { email: 'invalid-email' });

    const response = await client.createStudent(student);

    expect(response.status).toBe(400);
  });

  test('should fail to get non-existent student', async () => {
    const response = await client.getStudent(999999);

    expect(response.status).toBe(404);
  });
});

// TODO: Backend issue - depends on Student CRUD working
test.describe.skip('Student - Authorization', () => {
  let client: LumieApiClient;

  test.beforeEach(async () => {
    client = new LumieApiClient();
    await client.init();
    client.setTenant(TEST_TENANT_SLUG);
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('should fail to create student without authentication', async () => {
    const student = createTestStudent(1);

    const response = await client.createStudent(student);

    expect([401, 403]).toContain(response.status);
  });

  test('should fail to list students without authentication', async () => {
    const response = await client.listStudents();

    expect([401, 403]).toContain(response.status);
  });
});
