import { Image } from '@/entities';
import { IImageRepository } from '@/application/repositories';
import { InMemoryRepository } from './base.repository';

export class ImageInMemoryRepository
  extends InMemoryRepository<Image>
  implements IImageRepository {
  // CRUD are from the base class
}
