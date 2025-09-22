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
import { EntityValidationError } from '@/entities/entity.errors';

// Define the use case
export class UpdateUseCase<T extends { id: string }> implements IUseCase<T> {
  constructor(private repository: IBaseRepository<BaseEntity>) {}

  // Execute the use case
  async execute(input: T): Promise<UseCaseReponse<BaseEntity>> {
    try {
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
      if (error instanceof EntityValidationError) {
        return failureValidation(error.message);
      }
      return failureInternal('Failed to update', (error as Error).message);
    }
  }
}
