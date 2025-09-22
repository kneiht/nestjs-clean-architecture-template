export enum ErrorType {
  VALIDATION = 'VALIDATION',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL = 'INTERNAL',
  CONFLICT = 'CONFLICT',
}

export enum SuccessType {
  OK = 'OK',
  CREATED = 'CREATED',
  NO_CONTENT = 'NO_CONTENT',
}

export type UseCaseReponse<T = unknown> = {
  success: boolean;
  message: string;
  type?: ErrorType | SuccessType;
  data?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  error?: string;
};

export function success<T>(
  data: T,
  message = 'Operation completed successfully',
  type: SuccessType,
): UseCaseReponse<T> {
  return {
    success: true,
    type: type,
    message,
    data,
  };
}

export function successOk<T>(
  data: T,
  message = 'Operation completed successfully',
): UseCaseReponse<T> {
  return {
    success: true,
    type: SuccessType.OK,
    message,
    data,
  };
}

export function successCreated<T>(
  data: T,
  message = 'Resource created successfully',
): UseCaseReponse<T> {
  return {
    success: true,
    type: SuccessType.CREATED,
    message,
    data,
  };
}

export function successNoContent<T>(
  message = 'Operation successful, no content to return',
): UseCaseReponse<T> {
  return {
    success: true,
    type: SuccessType.NO_CONTENT,
    message,
  };
}

export function failure<T = never>(
  message = 'Operation failed',
  errorType: ErrorType,
  error?: string,
): UseCaseReponse<T> {
  return {
    success: false,
    type: errorType,
    message,
    error,
  };
}

export function failureValidation<T = never>(
  message = 'Validation failed',
  error?: string,
): UseCaseReponse<T> {
  return failure(message, ErrorType.VALIDATION, error);
}

export function failureNotFound<T = never>(
  message = 'Resource not found',
  error?: string,
): UseCaseReponse<T> {
  return failure(message, ErrorType.NOT_FOUND, error);
}

export function failureUnauthorized<T = never>(
  message = 'Unauthorized access',
  error?: string,
): UseCaseReponse<T> {
  return failure(message, ErrorType.UNAUTHORIZED, error);
}

export function failureForbidden<T = never>(
  message = 'Forbidden access',
  error?: string,
): UseCaseReponse<T> {
  return failure(message, ErrorType.FORBIDDEN, error);
}

export function failureInternal<T = never>(
  message = 'An internal server error occurred',
  error?: string,
): UseCaseReponse<T> {
  return failure(message, ErrorType.INTERNAL, error);
}

export function failureConflict<T = never>(
  message = 'Conflict',
  error?: string,
): UseCaseReponse<T> {
  return failure(message, ErrorType.CONFLICT, error);
}
