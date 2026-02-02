// Global constants and configuration

export const APP_NAME = 'Lumie';

export const ROLES = {
  DEVELOPER: 'DEVELOPER',
  ADMIN: 'ADMIN',
  STUDENT: 'STUDENT',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
} as const;

