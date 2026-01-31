import { test, expect } from '@playwright/test';
import { LumieApiClient } from '../../utils/api-client';
import { createTestUser, TEST_TENANT_SLUG, VALID_PASSWORD } from '../../fixtures/test-data';

test.describe('Auth - Login', () => {
  let client: LumieApiClient;

  test.beforeEach(async () => {
    client = new LumieApiClient();
    await client.init();
    client.setTenant(TEST_TENANT_SLUG);
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('should login successfully with valid credentials', async () => {
    const user = createTestUser();

    // Register first
    await client.register(user);
    client.clearAuth();

    // Login
    const response = await client.login({
      email: user.email,
      password: user.password,
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('accessToken');
    expect(response.data).toHaveProperty('refreshToken');
    expect(response.data.accessToken).toBeTruthy();
    expect(response.data.refreshToken).toBeTruthy();
  });

  test('should fail with wrong password', async () => {
    const user = createTestUser();

    // Register first
    await client.register(user);
    client.clearAuth();

    // Login with wrong password
    const response = await client.login({
      email: user.email,
      password: 'WrongPassword123!',
    });

    expect(response.status).toBe(401);
  });

  test('should fail with non-existent user', async () => {
    const response = await client.login({
      email: 'nonexistent@test.lumie.kr',
      password: VALID_PASSWORD,
    });

    expect(response.status).toBe(401);
  });

  test('should fail with invalid email format', async () => {
    const response = await client.login({
      email: 'invalid-email',
      password: VALID_PASSWORD,
    });

    expect(response.status).toBe(400);
  });

  test('should fail with empty credentials', async () => {
    const response = await client.login({
      email: '',
      password: '',
    });

    expect(response.status).toBe(400);
  });

  test('should return user info after login', async () => {
    const user = createTestUser();

    // Register and get tokens
    await client.register(user);
    client.clearAuth();

    // Login
    const loginResponse = await client.login({
      email: user.email,
      password: user.password,
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.data.user).toHaveProperty('id');
    expect(loginResponse.data.user.email).toBe(user.email);
    expect(loginResponse.data.user.name).toBe(user.name);
  });

  test('should fail without tenant header', async () => {
    client.clearTenant();

    const response = await client.login({
      email: 'test@example.com',
      password: VALID_PASSWORD,
    });

    expect([400, 403]).toContain(response.status);
  });
});
