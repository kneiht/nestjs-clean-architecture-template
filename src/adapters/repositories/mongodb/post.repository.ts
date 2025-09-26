import { Post } from '@/entities/post.entity.js';
import { IPostRepository } from '@/application/repositories';
import { PostModel } from './schemas/post.schema.js';
import { MongoRepository } from './base.repository.js';

export class PostMongoRepository
  extends MongoRepository<Post>
  implements IPostRepository
{
  constructor() {
    super(PostModel);
  }

  async add(post: Post): Promise<Post> {
    const postData = {
      _id: post.id,
      ...post,
    };
    await PostModel.create(postData);
    return post;
  }

  async update(post: Post): Promise<Post> {
    await PostModel.findByIdAndUpdate(post.id, post).exec();
    return post;
  }
}
