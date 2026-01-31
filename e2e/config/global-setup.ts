import { FullConfig } from '@playwright/test';
import { getEnvironment, getServiceUrls } from './environments';

async function globalSetup(config: FullConfig): Promise<void> {
  const env = getEnvironment();
  const urls = getServiceUrls();

  console.log(`\n🚀 Starting E2E tests`);
  console.log(`   Environment: ${env}`);
  console.log(`   Tenant Service: ${urls.tenant}`);
  console.log(`   Auth Service: ${urls.auth}`);
  console.log(`   Academy Service: ${urls.academy}`);
  console.log(`   Exam Service: ${urls.exam}`);
  console.log('');

  // Health check for services (optional, can be enabled in CI)
  if (process.env.CHECK_SERVICES === 'true') {
    const services = [
      { name: 'Tenant', url: `${urls.tenant}/actuator/health` },
      { name: 'Auth', url: `${urls.auth}/actuator/health` },
      { name: 'Academy', url: `${urls.academy}/actuator/health` },
      { name: 'Exam', url: `${urls.exam}/actuator/health` },
    ];

    for (const service of services) {
      try {
        const response = await fetch(service.url);
        if (!response.ok) {
          console.warn(`⚠️  ${service.name} service returned ${response.status}`);
        } else {
          console.log(`✅ ${service.name} service is healthy`);
        }
      } catch (error) {
        console.warn(`⚠️  ${service.name} service is not reachable: ${service.url}`);
      }
    }
    console.log('');
  }
}

export default globalSetup;
