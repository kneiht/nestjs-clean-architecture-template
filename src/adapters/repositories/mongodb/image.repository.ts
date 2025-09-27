import { Image } from '@/entities';
import { IImageRepository } from '@/application/repositories';
import { MongoRepository } from './base.repository';

export class ImageMongoRepository
  extends MongoRepository<Image>
  implements IImageRepository {
  // CRUD are from the base class
}
