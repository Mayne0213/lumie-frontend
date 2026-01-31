import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig): Promise<void> {
  console.log('\n🏁 E2E tests completed\n');
}

export default globalTeardown;
