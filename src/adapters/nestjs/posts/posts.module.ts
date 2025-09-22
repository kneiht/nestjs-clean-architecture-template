import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';

// Import Repository
import { IPostRepository } from '@/application/repositories';
import { PostInMemoryRepository } from '@/adapters/repositories/in-memory';

// Import UseCase
import {
  GetAllUseCase,
  GetByIdUseCase,
  AddUseCase,
  UpdateUseCase,
  DeleteByIdUseCase,
} from '@/application/use-cases';

// Import the Post entity
import { Post } from '@/entities';

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
      provide: GetByIdUseCase,
      useFactory: (postRepository: IPostRepository) => {
        return new GetByIdUseCase(postRepository);
      },
      inject: [PostInMemoryRepository],
    },
    {
      provide: AddUseCase,
      useFactory: (postRepository: IPostRepository) => {
        return new AddUseCase(Post, postRepository);
      },
      inject: [PostInMemoryRepository],
    },
    {
      provide: UpdateUseCase,
      useFactory: (postRepository: IPostRepository) => {
        return new UpdateUseCase(postRepository);
      },
      inject: [PostInMemoryRepository],
    },
    {
      provide: DeleteByIdUseCase,
      useFactory: (postRepository: IPostRepository) => {
        return new DeleteByIdUseCase(postRepository);
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
