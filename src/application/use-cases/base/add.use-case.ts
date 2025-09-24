import { IBaseRepository } from '@/application/repositories';
import { IUseCase } from '..';
import {
  failureInternal,
  failureValidation,
  successCreated,
  UseCaseReponse,
} from '../response';
import { BaseEntity } from '@/entities/base.entity.js';
import {
  EntityValidationError,
  EntityInputValidationError,
} from '@/entities/entity.errors';
import { validateSafe } from '@/shared/validator';

type ClassType = new (...args: any[]) => any;

// Define the use case
export class AddUseCase<T> implements IUseCase<T> {
  constructor(
    private dtoClass: ClassType,
    private entityStaticMethods: typeof BaseEntity,
    private repository: IBaseRepository<BaseEntity>,
  ) {}

  async execute(input: T): Promise<UseCaseReponse<BaseEntity>> {
    try {
      // Validate the input
      const { ok, message } = await validateSafe(
        input as object,
        this.dtoClass,
      );
      if (!ok) {
        return failureValidation('Input validation failed', message);
      }

      // Create the entity
      const entity = await this.entityStaticMethods.create(input);

      // Add to Repository
      const newEntity = await this.repository.add(entity);

      // Return Success Response
      return successCreated(newEntity);
    } catch (error) {
      console.error(error);
      if (error instanceof EntityInputValidationError) {
        return failureValidation('Input validation failed', error.message);
      }
      if (error instanceof EntityValidationError) {
        return failureValidation('Entity validation failed', error.message);
      }
      return failureInternal('Failed to create entity');
    }
  }
}
