import { test, expect } from '@playwright/test';
import { LumieApiClient } from '../../utils/api-client';
import { createTestUser, TEST_TENANT_SLUG, createTestAcademy } from '../../fixtures/test-data';

test.describe('Academy - CRUD', () => {
  let client: LumieApiClient;

  test.beforeEach(async () => {
    client = new LumieApiClient();
    await client.init();
    client.setTenant(TEST_TENANT_SLUG);

    // Register and login for authentication
    const user = createTestUser();
    const registerResponse = await client.register(user);
    expect(registerResponse.status).toBe(201);
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('should create a new academy', async () => {
    const academy = createTestAcademy();

    const response = await client.createAcademy(academy);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data.name).toBe(academy.name);
  });

  test('should get academy by id', async () => {
    const academy = createTestAcademy();
    const created = await client.createAcademy(academy);
    expect(created.status).toBe(201);

    const response = await client.getAcademy(created.data.id);

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(created.data.id);
    expect(response.data.name).toBe(academy.name);
  });

  test('should list all academies', async () => {
    const academy1 = createTestAcademy({ name: 'Academy One' });
    const academy2 = createTestAcademy({ name: 'Academy Two' });

    await client.createAcademy(academy1);
    await client.createAcademy(academy2);

    const response = await client.listAcademies();

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('content');
    expect(response.data.content.length).toBeGreaterThanOrEqual(2);
  });

  test('should update academy', async () => {
    const academy = createTestAcademy();
    const created = await client.createAcademy(academy);
    expect(created.status).toBe(201);

    // Use unique name to avoid conflicts
    const updatedAcademy = createTestAcademy({ name: `Updated ${Date.now()}` });
    const response = await client.updateAcademy(created.data.id, {
      name: updatedAcademy.name,
    });

    expect(response.status).toBe(200);
    expect(response.data.name).toBe(updatedAcademy.name);
  });

  test('should deactivate academy', async () => {
    const academy = createTestAcademy();
    const created = await client.createAcademy(academy);
    expect(created.status).toBe(201);

    const deleteResponse = await client.deleteAcademy(created.data.id);
    expect(deleteResponse.status).toBe(204);
  });

  test('should fail to get non-existent academy', async () => {
    const response = await client.getAcademy(999999);

    expect(response.status).toBe(404);
  });
});

test.describe('Academy - Public Access', () => {
  let client: LumieApiClient;

  test.beforeEach(async () => {
    client = new LumieApiClient();
    await client.init();
    client.setTenant(TEST_TENANT_SLUG);
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  // Note: Academy API is publicly accessible (no auth required)
  test('should allow creating academy without authentication', async () => {
    const academy = createTestAcademy();

    const response = await client.createAcademy(academy);

    expect(response.status).toBe(201);
  });

  test('should allow listing academies without authentication', async () => {
    const response = await client.listAcademies();

    expect(response.status).toBe(200);
  });
});
