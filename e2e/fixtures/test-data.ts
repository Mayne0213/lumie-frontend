// Use existing tenant for E2E tests (must be ACTIVE status with schema provisioned)
export const TEST_TENANT_SLUG = 'finaltest';

export function generateUniqueEmail(prefix = 'test'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}@test.lumie.kr`;
}

export function generateUniqueSlug(prefix = 'test'): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  // Slug must start with letter, lowercase, 3-30 chars
  return `${prefix}-${timestamp}-${random}`.toLowerCase().substring(0, 30);
}

// Valid password: min 8 chars, uppercase, lowercase, digit, special char
export const VALID_PASSWORD = 'Test1234!';
export const WEAK_PASSWORD = '123';

export const testUsers = {
  admin: {
    email: generateUniqueEmail('admin'),
    password: VALID_PASSWORD,
    name: 'Test Admin',
  },
  teacher: {
    email: generateUniqueEmail('teacher'),
    password: VALID_PASSWORD,
    name: 'Test Teacher',
  },
  student: {
    email: generateUniqueEmail('student'),
    password: VALID_PASSWORD,
    name: 'Test Student',
  },
};

export const testTenants = {
  primary: {
    slug: generateUniqueSlug('tenant'),
    name: 'Test Tenant',
    displayName: 'Test Tenant Display',
    ownerEmail: generateUniqueEmail('owner'),
  },
  secondary: {
    slug: generateUniqueSlug('tenant2'),
    name: 'Secondary Tenant',
    displayName: 'Secondary Test Tenant',
    ownerEmail: generateUniqueEmail('owner2'),
  },
};

export const testAcademies = {
  primary: {
    name: 'Test Academy',
    description: 'A test academy for E2E testing',
  },
  secondary: {
    name: 'Secondary Academy',
    description: 'Another test academy',
  },
};

export const testStudents = {
  basic: {
    name: 'Test Student',
    email: generateUniqueEmail('student'),
    grade: '10',
  },
  withoutGrade: {
    name: 'Student Without Grade',
    email: generateUniqueEmail('no-grade'),
  },
};

export const testExams = {
  math: {
    name: 'Math Midterm Exam',
    totalQuestions: 5,
    correctAnswers: { '1': 'A', '2': 'B', '3': 'C', '4': 'D', '5': 'A' },
    questionScores: { '1': 20, '2': 20, '3': 20, '4': 20, '5': 20 },
    passScore: 60,
  },
  english: {
    name: 'English Quiz',
    totalQuestions: 3,
    correctAnswers: { '1': 'B', '2': 'A', '3': 'C' },
    questionScores: { '1': 10, '2': 10, '3': 10 },
    passScore: 20,
  },
};

export function createTestTenant(overrides: Partial<typeof testTenants.primary> = {}) {
  return {
    slug: generateUniqueSlug('tenant'),
    name: 'Test Tenant',
    displayName: 'Test Tenant Display',
    ownerEmail: generateUniqueEmail('owner'),
    ...overrides,
  };
}

export function createTestUser(overrides: Partial<typeof testUsers.admin> = {}) {
  return {
    email: generateUniqueEmail('user'),
    password: VALID_PASSWORD,
    name: 'Test User',
    ...overrides,
  };
}

export function generateUniqueName(prefix = 'Test'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 6);
  return `${prefix} ${timestamp}-${random}`;
}

export function createTestAcademy(overrides: Partial<typeof testAcademies.primary> = {}) {
  return {
    name: generateUniqueName('Academy'),
    description: 'Test academy description',
    ...overrides,
  };
}

export function createTestStudent(academyId: number, overrides: Partial<{
  email: string;
  password: string;
  name: string;
  phone: string;
  studentNumber: string;
  grade: string;
  schoolName: string;
  parentName: string;
  parentPhone: string;
}> = {}) {
  return {
    email: generateUniqueEmail('student'),
    password: VALID_PASSWORD,
    name: 'Test Student',
    academyId,
    grade: '10',
    ...overrides,
  };
}

export function createTestExam(overrides: Partial<typeof testExams.math> = {}) {
  return {
    name: generateUniqueName('Exam'),
    totalQuestions: 5,
    correctAnswers: { '1': 'A', '2': 'B', '3': 'C', '4': 'D', '5': 'A' },
    questionScores: { '1': 20, '2': 20, '3': 20, '4': 20, '5': 20 },
    passScore: 60,
    ...overrides,
  };
}

export function createTestExamResult(studentId: number, answers: Record<string, string>) {
  return {
    studentId,
    answers,
  };
}
