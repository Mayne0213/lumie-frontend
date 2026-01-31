import { APIRequestContext, request } from '@playwright/test';
import { getServiceUrls, ServiceUrls } from '../config/environments';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface TenantPayload {
  slug: string;
  name: string;
  displayName?: string;
  ownerEmail?: string;
}

export interface AcademyPayload {
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  businessNumber?: string;
}

export interface StudentPayload {
  email: string;
  password: string;
  name: string;
  academyId: number;
  phone?: string;
  studentNumber?: string;
  grade?: string;
  schoolName?: string;
  parentName?: string;
  parentPhone?: string;
}

export interface ExamPayload {
  name: string;
  category?: string;
  totalQuestions: number;
  correctAnswers: Record<string, string>;
  questionScores: Record<string, number>;
  questionTypes?: Record<string, string>;
  passScore?: number;
}

export interface SubmitResultPayload {
  studentId: number;
  answers: Record<string, string>;
}

export interface BulkSubmitResultsPayload {
  results: SubmitResultPayload[];
}

export class LumieApiClient {
  private context: APIRequestContext | null = null;
  private tokens: AuthTokens | null = null;
  private tenantSlug: string | null = null;
  private urls: ServiceUrls;

  constructor() {
    this.urls = getServiceUrls();
  }

  async init(): Promise<void> {
    this.context = await request.newContext({
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
  }

  async dispose(): Promise<void> {
    if (this.context) {
      await this.context.dispose();
      this.context = null;
    }
  }

  setTenant(slug: string): void {
    this.tenantSlug = slug;
  }

  getTenant(): string | null {
    return this.tenantSlug;
  }

  setTokens(tokens: AuthTokens): void {
    this.tokens = tokens;
  }

  clearAuth(): void {
    this.tokens = null;
  }

  clearTenant(): void {
    this.tenantSlug = null;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.tenantSlug) {
      headers['X-Tenant-Slug'] = this.tenantSlug;
    }

    if (this.tokens?.accessToken) {
      headers['Authorization'] = `Bearer ${this.tokens.accessToken}`;
    }

    return headers;
  }

  // Tenant Service
  async createTenant(payload: TenantPayload) {
    const response = await this.context!.post(`${this.urls.tenant}/api/v1/tenants`, {
      data: payload,
      headers: { 'Content-Type': 'application/json' },
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  async fetchTenant(slug: string) {
    const response = await this.context!.get(`${this.urls.tenant}/api/v1/tenants/${slug}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  async listTenants() {
    const response = await this.context!.get(`${this.urls.tenant}/api/v1/tenants`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  async deleteTenant(slug: string) {
    const response = await this.context!.delete(`${this.urls.tenant}/api/v1/tenants/${slug}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  // Auth Service
  async register(payload: RegisterPayload) {
    const response = await this.context!.post(`${this.urls.auth}/api/v1/auth/register`, {
      data: payload,
      headers: this.getHeaders(),
    });
    const data = await response.json().catch(() => null);

    if (response.ok() && data?.accessToken) {
      this.tokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    }

    return {
      status: response.status(),
      data,
    };
  }

  async login(payload: LoginPayload) {
    const response = await this.context!.post(`${this.urls.auth}/api/v1/auth/login`, {
      data: payload,
      headers: this.getHeaders(),
    });
    const data = await response.json().catch(() => null);

    if (response.ok() && data?.accessToken) {
      this.tokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    }

    return {
      status: response.status(),
      data,
    };
  }

  async refreshToken(refreshToken?: string) {
    const token = refreshToken || this.tokens?.refreshToken;
    const response = await this.context!.post(`${this.urls.auth}/api/v1/auth/refresh`, {
      data: { refreshToken: token },
      headers: this.getHeaders(),
    });
    const data = await response.json().catch(() => null);

    if (response.ok() && data?.accessToken) {
      this.tokens = {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken || token!,
      };
    }

    return {
      status: response.status(),
      data,
    };
  }

  async logout() {
    const response = await this.context!.post(`${this.urls.auth}/api/v1/auth/logout`, {
      headers: this.getHeaders(),
    });
    if (response.ok()) {
      this.tokens = null;
    }
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  // Academy Service
  async createAcademy(payload: AcademyPayload) {
    const response = await this.context!.post(`${this.urls.academy}/api/v1/academies`, {
      data: payload,
      headers: this.getHeaders(),
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  async getAcademy(id: number) {
    const response = await this.context!.get(`${this.urls.academy}/api/v1/academies/${id}`, {
      headers: this.getHeaders(),
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  async listAcademies() {
    const response = await this.context!.get(`${this.urls.academy}/api/v1/academies`, {
      headers: this.getHeaders(),
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  async updateAcademy(id: number, payload: Partial<AcademyPayload>) {
    const response = await this.context!.put(`${this.urls.academy}/api/v1/academies/${id}`, {
      data: payload,
      headers: this.getHeaders(),
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  async deleteAcademy(id: number) {
    const response = await this.context!.delete(`${this.urls.academy}/api/v1/academies/${id}`, {
      headers: this.getHeaders(),
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  async createStudent(payload: StudentPayload) {
    const response = await this.context!.post(`${this.urls.academy}/api/v1/students`, {
      data: payload,
      headers: this.getHeaders(),
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  async getStudent(id: number) {
    const response = await this.context!.get(`${this.urls.academy}/api/v1/students/${id}`, {
      headers: this.getHeaders(),
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  async listStudents() {
    const response = await this.context!.get(`${this.urls.academy}/api/v1/students`, {
      headers: this.getHeaders(),
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  // Exam Service
  async createExam(payload: ExamPayload) {
    const response = await this.context!.post(`${this.urls.exam}/api/v1/exams`, {
      data: payload,
      headers: this.getHeaders(),
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  async getExam(id: number) {
    const response = await this.context!.get(`${this.urls.exam}/api/v1/exams/${id}`, {
      headers: this.getHeaders(),
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  async listExams() {
    const response = await this.context!.get(`${this.urls.exam}/api/v1/exams`, {
      headers: this.getHeaders(),
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  async deleteExam(id: number) {
    const response = await this.context!.delete(`${this.urls.exam}/api/v1/exams/${id}`, {
      headers: this.getHeaders(),
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  async submitExamResults(examId: number, payload: BulkSubmitResultsPayload) {
    const response = await this.context!.post(`${this.urls.exam}/api/v1/exams/${examId}/results`, {
      data: payload,
      headers: this.getHeaders(),
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  async getExamResults(examId: number) {
    const response = await this.context!.get(`${this.urls.exam}/api/v1/exams/${examId}/results`, {
      headers: this.getHeaders(),
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }

  async getStudentResults(studentId: number) {
    const response = await this.context!.get(`${this.urls.exam}/api/v1/students/${studentId}/results`, {
      headers: this.getHeaders(),
    });
    return {
      status: response.status(),
      data: await response.json().catch(() => null),
    };
  }
}
