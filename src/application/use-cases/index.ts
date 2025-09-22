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
