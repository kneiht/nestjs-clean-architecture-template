import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';

import { GetAllUseCase } from '@/application/use-cases';
import { IPostRepository } from '@/application/repositories';
import { PostInMemoryRepository } from '@/adapters/repositories/in-memory';

@Module({
  controllers: [PostsController],
  providers: [
    {
      provide: GetAllUseCase,
      useFactory: (postRepository: IPostRepository) => {
        return new GetAllUseCase(postRepository);
      },
      inject: [PostInMemoryRepository],
    },
    {
      provide: PostInMemoryRepository,
      useClass: PostInMemoryRepository,
    },
  ],
})
export class PostsModule {}
