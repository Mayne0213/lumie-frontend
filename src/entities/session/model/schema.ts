import { z } from 'zod';

// Role enum
export const RoleSchema = z.enum(['OWNER', 'DEVELOPER', 'ADMIN', 'STUDENT']);
export type Role = z.infer<typeof RoleSchema>;

// User schema
export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().min(2).max(100),
  role: RoleSchema,
  tenantSlug: z.string(),
  tenantId: z.number(),
});

export type User = z.infer<typeof userSchema>;

// Auth tokens schema
export const authTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  accessExpiresIn: z.number(),
  refreshExpiresIn: z.number(),
});

export type AuthTokens = z.infer<typeof authTokensSchema>;

// Login response schema
export const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  accessExpiresIn: z.number(),
  refreshExpiresIn: z.number(),
  user: userSchema,
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

// Login request schema
export const loginRequestSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

// Register request schema
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

export const registerRequestSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.').max(255, '이메일은 255자를 초과할 수 없습니다.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .max(128, '비밀번호는 128자를 초과할 수 없습니다.')
    .regex(passwordRegex, '비밀번호는 대문자, 소문자, 숫자, 특수문자(@$!%*?&)를 각각 하나 이상 포함해야 합니다.'),
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다.').max(100, '이름은 100자를 초과할 수 없습니다.'),
});

export type RegisterRequest = z.infer<typeof registerRequestSchema>;

// Owner register request schema (for institute registration)
const businessRegNumberRegex = /^\d{3}-\d{2}-\d{5}$/;

export const ownerRegisterRequestSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.').max(255, '이메일은 255자를 초과할 수 없습니다.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .max(128, '비밀번호는 128자를 초과할 수 없습니다.')
    .regex(passwordRegex, '비밀번호는 대문자, 소문자, 숫자, 특수문자(@$!%*?&)를 각각 하나 이상 포함해야 합니다.'),
  name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다.').max(100, '이름은 100자를 초과할 수 없습니다.'),
  instituteName: z.string().min(2, '기관명은 최소 2자 이상이어야 합니다.').max(200, '기관명은 200자를 초과할 수 없습니다.'),
  businessRegistrationNumber: z
    .string()
    .regex(businessRegNumberRegex, '사업자등록번호 형식이 올바르지 않습니다. (예: 123-45-67890)'),
});

export type OwnerRegisterRequest = z.infer<typeof ownerRegisterRequestSchema>;
