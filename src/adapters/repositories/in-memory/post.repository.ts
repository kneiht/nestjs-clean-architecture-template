import { Post } from '@/entities';
import { IPostRepository } from '@/application/repositories';
import { InMemoryRepository } from './base.repository';
import { seedPosts } from './seed';

export class PostInMemoryRepository
  extends InMemoryRepository<Post>
  implements IPostRepository
{
  // CRUD are from the base class
  constructor() {
    super();
    void seedPosts().then((posts) => {
      this.items = posts;
    });
  }
}
