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

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: GetAllUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new GetAllUseCase(userRepository);
      },
      inject: [UserInMemoryRepository],
    },
    {
      provide: GetByIdUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new GetByIdUseCase(userRepository);
      },
      inject: [UserInMemoryRepository],
    },
    {
      provide: DeleteByIdUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new DeleteByIdUseCase(userRepository);
      },
      inject: [UserInMemoryRepository],
    },
    {
      provide: AddUserUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new AddUserUseCase(userRepository);
      },
      inject: [UserInMemoryRepository],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new UpdateUserUseCase(userRepository);
      },
      inject: [UserInMemoryRepository],
    },
    {
      provide: UserInMemoryRepository,
      useClass: UserInMemoryRepository,
    },
  ],
  exports: [AddUserUseCase, UserInMemoryRepository],
})
export class UsersModule {}
