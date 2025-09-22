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
  InputValidationError,
} from '@/entities/entity.errors';

// Define the use case
export class AddUseCase<T> implements IUseCase<T> {
  constructor(
    private entityStaticMethods: typeof BaseEntity,
    private repository: IBaseRepository<BaseEntity>,
  ) {}

  async execute(input: T): Promise<UseCaseReponse<BaseEntity>> {
    try {
      // Create the entity
      const entity = await this.entityStaticMethods.create(input);

      // Add to Repository
      const newEntity = await this.repository.add(entity);

      // Return Success Response
      return successCreated(newEntity);
    } catch (error) {
      console.error(error);
      if (error instanceof InputValidationError) {
        return failureValidation('Input validation failed', error.message);
      }
      if (error instanceof EntityValidationError) {
        return failureValidation('Entity validation failed', error.message);
      }
      return failureInternal('Failed to create entity');
    }
  }
}
