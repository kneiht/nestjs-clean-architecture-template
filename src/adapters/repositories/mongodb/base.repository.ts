 
import { Model } from 'mongoose';
import { IBaseRepository } from '@/application/repositories';

export abstract class MongoRepository<TEntity extends { id: string }>
  implements IBaseRepository<TEntity>
{
  constructor(private readonly model: Model<any>) {}

  async findById(id: string): Promise<TEntity | null> {
    const doc = await this.model.findById(id).exec();
    return doc as TEntity;
  }

  async findAll(): Promise<TEntity[]> {
    const docs = await this.model.find().exec();
    return docs as TEntity[];
  }

  async add(entity: TEntity): Promise<TEntity> {
    // Mongoose's create can often take a plain object representation of the entity
    await this.model.create(entity);
    return entity;
  }

  async update(entity: TEntity): Promise<TEntity> {
    await this.model.findByIdAndUpdate(entity.id, entity).exec();
    return entity;
  }

  async delete(entity: TEntity): Promise<void> {
    await this.model.findByIdAndDelete(entity.id).exec();
  }
}
