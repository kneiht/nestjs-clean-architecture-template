import { Post } from '@/entities/post.entity.js';
import { IBaseRepository } from './base.repository.js';

export interface IPostRepository extends IBaseRepository<Post> {}
