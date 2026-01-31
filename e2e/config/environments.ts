export type Environment = 'local' | 'docker' | 'k3s' | 'mirrord' | 'ci';

export interface ServiceUrls {
  tenant: string;
  auth: string;
  academy: string;
  exam: string;
}

const environments: Record<Environment, ServiceUrls> = {
  local: {
    tenant: 'http://localhost:8082',
    auth: 'http://localhost:8081',
    academy: 'http://localhost:8083',
    exam: 'http://localhost:8084',
  },
  docker: {
    // Docker Compose 개발 환경 (local과 동일한 포트)
    tenant: 'http://localhost:8082',
    auth: 'http://localhost:8081',
    academy: 'http://localhost:8083',
    exam: 'http://localhost:8084',
  },
  k3s: {
    tenant: process.env.TENANT_SERVICE_URL || 'http://localhost:8082',
    auth: process.env.AUTH_SERVICE_URL || 'http://localhost:8081',
    academy: process.env.ACADEMY_SERVICE_URL || 'http://localhost:8083',
    exam: process.env.EXAM_SERVICE_URL || 'http://localhost:8084',
  },
  mirrord: {
    tenant: process.env.TENANT_SERVICE_URL || 'http://tenant-svc.lumie-tenant.svc.cluster.local:8080',
    auth: process.env.AUTH_SERVICE_URL || 'http://auth-svc.lumie-auth.svc.cluster.local:8080',
    academy: process.env.ACADEMY_SERVICE_URL || 'http://academy-svc.lumie-academy.svc.cluster.local:8080',
    exam: process.env.EXAM_SERVICE_URL || 'http://exam-svc.lumie-exam.svc.cluster.local:8080',
  },
  ci: {
    tenant: process.env.TENANT_SERVICE_URL!,
    auth: process.env.AUTH_SERVICE_URL!,
    academy: process.env.ACADEMY_SERVICE_URL!,
    exam: process.env.EXAM_SERVICE_URL!,
  },
};

export function getEnvironment(): Environment {
  const env = process.env.TEST_ENV as Environment;
  if (env && environments[env]) {
    return env;
  }
  return 'local';
}

export function getServiceUrls(): ServiceUrls {
  return environments[getEnvironment()];
}
