interface ApiResult<T> {
  isSuccess?: boolean;
  data?: T;
  error?: ApiError;
}

interface ApiError {
  message?: string;
}

export type { ApiResult, ApiError };
