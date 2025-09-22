import { IBaseRepository } from '@/application/repositories';
import { IUseCase } from '..';
import { failureInternal, successOk, UseCaseReponse } from '../response';
import { BaseEntity } from '@/entities/base.entity.js';

export class GetAllUseCase implements IUseCase<void> {
  constructor(private repository: IBaseRepository<BaseEntity>) {}

  async execute(): Promise<UseCaseReponse<BaseEntity[]>> {
    try {
      const entities = await this.repository.findAll();
      return successOk(entities);
    } catch (error) {
      console.error(error);
      return failureInternal('Failed to retrieve', (error as Error).message);
    }
  }
}
