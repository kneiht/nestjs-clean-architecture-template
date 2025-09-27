import { Image } from '@/entities/image.entity.js';
import { IBaseRepository } from './base.repository.js';

export interface IImageRepository extends IBaseRepository<Image> {}
