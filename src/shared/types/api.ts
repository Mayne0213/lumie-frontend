// Common API types

export interface ApiError {
  status: number;
  message: string;
  code?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}

export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}
