import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';

// Import Repository
import { IPostRepository } from '@/application/repositories';
import { PostRepository } from '@/adapters/repositories';

// Import UseCase
import {
  GetAllUseCase,
  GetByIdUseCase,
  AddUseCase,
  UpdateUseCase,
  DeleteByIdUseCase,
} from '@/application/use-cases';

// Import the Post entity
import { CreatePostDto, UpdatePostDto, Post } from '@/entities';

// Create an array of use cases having the same dependencies
const useCases = [GetAllUseCase, GetByIdUseCase, DeleteByIdUseCase];

// Create an array of providers
const useCaseProviders = useCases.map((uc) => ({
  provide: uc,
  useFactory: (postRepository: IPostRepository) => new uc(postRepository),
  inject: ['IPostRepository'],
}));

@Module({
  controllers: [PostsController],
  providers: [
    ...useCaseProviders,
    {
      provide: AddUseCase,
      useFactory: (postRepository: IPostRepository) => {
        return new AddUseCase(CreatePostDto, Post, postRepository);
      },
      inject: ['IPostRepository'],
    },
    {
      provide: 'IPostRepository',
      useClass: PostRepository,
    },
    {
      provide: UpdateUseCase,
      useFactory: (postRepository: IPostRepository) => {
        return new UpdateUseCase(UpdatePostDto, postRepository);
      },
      inject: ['IPostRepository'],
    },
  ],
})
export class PostsModule {}
