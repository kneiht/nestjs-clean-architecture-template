import { IBaseRepository } from '@/application/repositories';
import { IUseCase } from '..';
import {
  failureInternal,
  failureNotFound,
  successNoContent,
  UseCaseReponse,
} from '../response';
import { BaseEntity } from '@/entities/base.entity';

// Define the use case
export class DeleteByIdUseCase implements IUseCase<string> {
  constructor(private repository: IBaseRepository<BaseEntity>) {}

  // Execute the use case
  async execute(id: string): Promise<UseCaseReponse<null>> {
    try {
      // Find the entity
      const entity = await this.repository.findById(id);
      if (!entity) {
        return failureNotFound('Not found');
      }

      // Delete the entity
      await this.repository.delete(entity);

      // Return success with no content
      return successNoContent();
    } catch (error) {
      console.error(error);
      return failureInternal('Failed to delete', (error as Error).message);
    }
  }
}
