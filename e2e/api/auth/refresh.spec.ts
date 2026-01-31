import { test, expect } from '@playwright/test';
import { LumieApiClient } from '../../utils/api-client';
import { createTestUser, TEST_TENANT_SLUG } from '../../fixtures/test-data';

test.describe('Auth - Token Refresh', () => {
  let client: LumieApiClient;

  test.beforeEach(async () => {
    client = new LumieApiClient();
    await client.init();
    client.setTenant(TEST_TENANT_SLUG);
  });

  test.afterEach(async () => {
    await client.dispose();
  });

  test('should refresh token successfully', async () => {
    const user = createTestUser();

    // Register and get tokens
    const registerResponse = await client.register(user);
    expect(registerResponse.status).toBe(201);

    const refreshToken = registerResponse.data.refreshToken;

    // Refresh token
    const response = await client.refreshToken(refreshToken);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('accessToken');
    expect(response.data.accessToken).toBeTruthy();
  });

  test('should fail with invalid refresh token', async () => {
    const response = await client.refreshToken('invalid-refresh-token');

    expect(response.status).toBe(401);
  });

  test('should fail with empty refresh token', async () => {
    const response = await client.refreshToken('');

    expect(response.status).toBe(400);
  });

  test('should be able to use new access token after refresh', async () => {
    const user = createTestUser();

    // Register
    const registerResponse = await client.register(user);
    expect(registerResponse.status).toBe(201);

    // Refresh token (this updates the internal token)
    const refreshResponse = await client.refreshToken();
    expect(refreshResponse.status).toBe(200);

    // Logout should work with new token
    const logoutResponse = await client.logout();
    expect(logoutResponse.status).toBe(204);
  });

  test('should not be able to call protected endpoint without token', async () => {
    // No token set
    const logoutResponse = await client.logout();

    // Backend may return 401 (Unauthorized) or 403 (Forbidden)
    expect([401, 403]).toContain(logoutResponse.status);
  });

  test('should not be able to call protected endpoint after clearing auth', async () => {
    const user = createTestUser();

    // Register
    await client.register(user);

    // Clear auth
    client.clearAuth();

    // Try to logout
    const logoutResponse = await client.logout();

    // Backend may return 401 (Unauthorized) or 403 (Forbidden)
    expect([401, 403]).toContain(logoutResponse.status);
  });
});
