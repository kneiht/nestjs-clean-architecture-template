import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from '@/config/environment';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

// Import Repository
import { IUserRepository } from '@/application/repositories';
import { UserInMemoryRepository } from '@/adapters/repositories/in-memory';

// Import Use Cases
import { LoginUseCase, RegisterUseCase } from '@/application/use-cases';
import { AddUserUseCase } from '@/application/use-cases';

// Import Services
import { JsonWebToken } from '@/adapters/services/jwt.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: env.JWT_ACCESS_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: LoginUseCase,
      useFactory: (
        userRepository: IUserRepository,
        jsonWebToken: JsonWebToken,
      ) => {
        return new LoginUseCase(userRepository, jsonWebToken);
      },
      inject: [UserInMemoryRepository, JsonWebToken],
    },
    {
      provide: RegisterUseCase,
      useFactory: (
        addUserUseCase: AddUserUseCase,
        jsonWebToken: JsonWebToken,
      ) => {
        return new RegisterUseCase(jsonWebToken, addUserUseCase);
      },
      inject: [AddUserUseCase, JsonWebToken],
    },
    {
      provide: JsonWebToken,
      useClass: JsonWebToken,
    },
  ],
})
export class AuthModule {}
