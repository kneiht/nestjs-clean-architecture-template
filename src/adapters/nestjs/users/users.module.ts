import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

// Import Repository
import { IUserRepository } from '@/application/repositories';
import { UserInMemoryRepository } from '@/adapters/repositories/in-memory';

// Import generic use cases
import {
  GetAllUseCase,
  GetByIdUseCase,
  DeleteByIdUseCase,
} from '@/application/use-cases';

// Import specific use cases
import { AddUserUseCase, UpdateUserUseCase } from '@/application/use-cases';

// Create an array of use cases having the same dependencies
const useCases = [
  GetAllUseCase,
  GetByIdUseCase,
  DeleteByIdUseCase,
  AddUserUseCase,
  UpdateUserUseCase,
];

// Create an array of providers
const useCaseProviders = useCases.map((uc) => ({
  provide: uc,
  useFactory: (userRepository: IUserRepository) => new uc(userRepository),
  inject: ['IUserRepository'],
}));

@Module({
  controllers: [UsersController],
  providers: [
    ...useCaseProviders,
    {
      provide: 'IUserRepository',
      useClass: UserInMemoryRepository,
    },
  ],
  exports: [AddUserUseCase, 'IUserRepository'],
})
export class UsersModule {}
