export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  count?: number;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  age?: number;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  age?: number;
}

export interface DatabaseConfig {
  uri: string;
  options?: {
    maxPoolSize?: number;
    minPoolSize?: number;
    maxIdleTimeMS?: number;
    serverSelectionTimeoutMS?: number;
  };
}