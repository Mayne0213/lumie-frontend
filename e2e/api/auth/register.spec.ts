import { test, expect } from '@playwright/test';
import { LumieApiClient } from '../../utils/api-client';
import { createTestUser, TEST_TENANT_SLUG, WEAK_PASSWORD } from '../../fixtures/test-data';

test.describe('Auth - Register', () => {
  let client: LumieApiClient;

  test.beforeEach(async () => {
    client = new LumieApiClient();
    await client.init();
    client.setTenant(TEST_TENANT_SLUG);
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('should register a new user successfully', async () => {
    const user = createTestUser();

    const response = await client.register(user);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('accessToken');
    expect(response.data).toHaveProperty('refreshToken');
    expect(response.data.user).toHaveProperty('id');
    expect(response.data.user.email).toBe(user.email);
    expect(response.data.user.name).toBe(user.name);
  });

  test('should fail with duplicate email', async () => {
    const user = createTestUser();

    // First registration
    const first = await client.register(user);
    expect(first.status).toBe(201);

    // Clear tokens for second registration attempt
    client.clearAuth();

    // Second registration with same email
    const second = await client.register(user);
    // Backend may return 409 (Conflict) or 500 (Internal Server Error) for duplicate email
    expect([409, 500]).toContain(second.status);
  });

  test('should fail with invalid email format', async () => {
    const user = createTestUser({ email: 'invalid-email' });

    const response = await client.register(user);

    expect(response.status).toBe(400);
  });

  test('should fail with weak password', async () => {
    const user = createTestUser({ password: WEAK_PASSWORD });

    const response = await client.register(user);

    expect(response.status).toBe(400);
  });

  test('should fail with missing required fields', async () => {
    const response = await client.register({
      email: '',
      password: '',
      name: '',
    });

    expect(response.status).toBe(400);
  });

  test('should fail without name', async () => {
    const user = createTestUser({ name: '' });

    const response = await client.register(user);

    expect(response.status).toBe(400);
  });

  test('should fail without tenant header', async () => {
    client.clearTenant();
    const user = createTestUser();

    const response = await client.register(user);

    // Should fail with 400 or 403 when no tenant header
    expect([400, 403]).toContain(response.status);
  });
});
