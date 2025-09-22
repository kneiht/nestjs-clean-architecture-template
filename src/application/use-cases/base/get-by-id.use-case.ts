import { IBaseRepository } from '@/application/repositories';
import { IUseCase } from '..';
import {
  failureInternal,
  failureNotFound,
  successOk,
  UseCaseReponse,
} from '../response';
import { BaseEntity } from '@/entities/base.entity.js';

// Define the use case
export class GetByIdUseCase implements IUseCase<string> {
  constructor(private repository: IBaseRepository<BaseEntity>) {}

  // Execute the use case
  async execute(id: string): Promise<UseCaseReponse<BaseEntity | null>> {
    try {
      // Find the entity by ID
      const entity = await this.repository.findById(id);
      if (!entity) {
        return failureNotFound(`Not found`);
      }

      // Return a success response
      return successOk(entity);
    } catch (error) {
      console.error(error);
      return failureInternal('Failed to retrieve', (error as Error).message);
    }
  }
}
