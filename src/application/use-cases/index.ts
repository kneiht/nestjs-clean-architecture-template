import { UseCaseReponse } from './response';

export interface IUseCase<T> {
  execute(input: T): Promise<UseCaseReponse<unknown>>;
}

export * from './base/add.use-case.js';
export * from './base/get-all.use-case.js';
export * from './base/get-by-id.use-case.js';
export * from './base/update.use-case.js';
export * from './base/delete-by-id.use-case.js';

export * from './user/add-user.use-case';
export * from './user/update-user.use-case';

export * from './auth/login.use-case';
export * from './auth/register.use-case';
export * from './auth/check-auth.use-case';

export * from './uploads/upload-image.use-case';
