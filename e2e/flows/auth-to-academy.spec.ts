import { test, expect } from '@playwright/test';
import { LumieApiClient } from '../utils/api-client';
import {
  createTestUser,
  TEST_TENANT_SLUG,
  createTestAcademy,
  createTestStudent,
} from '../fixtures/test-data';

// TODO: Backend issue - depends on Student service working
test.describe.skip('E2E Flow: Auth to Academy', () => {
  let client: LumieApiClient;

  test.beforeEach(async () => {
    client = new LumieApiClient();
    await client.init();
    client.setTenant(TEST_TENANT_SLUG);
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('complete user registration to student enrollment flow', async () => {
    // Step 1: Register a new user
    const user = createTestUser();
    const registerResponse = await client.register(user);
    expect(registerResponse.status).toBe(201);
    expect(registerResponse.data).toHaveProperty('accessToken');
    expect(registerResponse.data.user.email).toBe(user.email);

    // Step 2: Create a new academy
    const academy = createTestAcademy();
    const academyResponse = await client.createAcademy(academy);
    expect(academyResponse.status).toBe(201);
    expect(academyResponse.data).toHaveProperty('id');
    const academyId = academyResponse.data.id;

    // Step 3: Verify academy was created
    const getAcademyResponse = await client.getAcademy(academyId);
    expect(getAcademyResponse.status).toBe(200);
    expect(getAcademyResponse.data.name).toBe(academy.name);

    // Step 4: Register a student in the academy
    const student = createTestStudent(academyId);
    const studentResponse = await client.createStudent(student);
    expect(studentResponse.status).toBe(201);
    expect(studentResponse.data).toHaveProperty('id');

    // Step 5: Verify student list
    const studentsResponse = await client.listStudents();
    expect(studentsResponse.status).toBe(200);
    expect(studentsResponse.data.content.length).toBeGreaterThanOrEqual(1);
  });

  test('token refresh maintains session during flow', async () => {
    // Register
    const user = createTestUser();
    const registerResponse = await client.register(user);
    expect(registerResponse.status).toBe(201);

    // Create academy
    const academy = createTestAcademy();
    const academyResponse = await client.createAcademy(academy);
    expect(academyResponse.status).toBe(201);
    const academyId = academyResponse.data.id;

    // Refresh token
    const refreshResponse = await client.refreshToken();
    expect(refreshResponse.status).toBe(200);
    expect(refreshResponse.data).toHaveProperty('accessToken');

    // Continue operations with new token - create student
    const student = createTestStudent(academyId);
    const studentResponse = await client.createStudent(student);
    expect(studentResponse.status).toBe(201);

    // Verify student was created
    const studentsResponse = await client.listStudents();
    expect(studentsResponse.status).toBe(200);
    expect(studentsResponse.data.content.length).toBeGreaterThan(0);
  });

  test('multiple academies with separate student lists', async () => {
    // Register user
    const user = createTestUser();
    await client.register(user);

    // Create first academy with students
    const academy1 = createTestAcademy({ name: 'Academy One' });
    const academy1Response = await client.createAcademy(academy1);
    const academy1Id = academy1Response.data.id;

    const student1 = createTestStudent(academy1Id, { name: 'Student in Academy 1' });
    await client.createStudent(student1);

    // Create second academy with students
    const academy2 = createTestAcademy({ name: 'Academy Two' });
    const academy2Response = await client.createAcademy(academy2);
    const academy2Id = academy2Response.data.id;

    const student2 = createTestStudent(academy2Id, { name: 'Student in Academy 2' });
    await client.createStudent(student2);

    // Verify both academies exist
    const academiesResponse = await client.listAcademies();
    expect(academiesResponse.status).toBe(200);
    expect(academiesResponse.data.content.length).toBeGreaterThanOrEqual(2);

    // Verify all students exist
    const studentsResponse = await client.listStudents();
    expect(studentsResponse.status).toBe(200);
    expect(studentsResponse.data.content.length).toBeGreaterThanOrEqual(2);
  });
});
