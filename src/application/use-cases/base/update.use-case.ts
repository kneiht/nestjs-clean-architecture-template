import { IBaseRepository } from '@/application/repositories';
import { IUseCase } from '..';
import {
  failureInternal,
  failureNotFound,
  failureValidation,
  successOk,
  UseCaseReponse,
} from '../response';
import { BaseEntity } from '@/entities/base.entity';
import {
  EntityValidationError,
  EntityInputValidationError,
} from '@/entities/entity.errors';
import { validateSafe } from '@/shared/validator';

type ClassType = new (...args: any[]) => any;

// Define the use case
export class UpdateUseCase<T extends { id: string }> implements IUseCase<T> {
  constructor(
    private dtoClass: ClassType,
    private repository: IBaseRepository<BaseEntity>,
  ) {}

  // Execute the use case
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

      const { id, ...updatePayload } = input;

      // Fetch the existing entity
      const entity = await this.repository.findById(id);
      if (!entity) {
        return failureNotFound('Not found');
      }

      // Update the entity and validate
      Object.assign(entity, updatePayload);
      entity.updatedAt = new Date();

      // Re-validate the entity after update
      await entity.validate();

      // Save the updated entity
      const updatedEntity = await this.repository.update(entity);

      // Return success response
      return successOk(updatedEntity);
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
