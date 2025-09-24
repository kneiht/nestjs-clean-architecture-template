import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from '@/config/environment';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

// Import Repository
import { IUserRepository } from '@/application/repositories';

// Import Use Cases
import { LoginUseCase, RegisterUseCase } from '@/application/use-cases';
import { AddUserUseCase } from '@/application/use-cases';

// Import Services
import { JsonWebToken } from '@/adapters/services/jwt.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { IJsonWebToken } from '@/application/services/jwt.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
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
        jsonWebToken: IJsonWebToken,
      ) => {
        return new LoginUseCase(userRepository, jsonWebToken);
      },
      inject: ['IUserRepository', 'IJsonWebToken'],
    },
    {
      provide: RegisterUseCase,
      useFactory: (
        addUserUseCase: AddUserUseCase,
        jsonWebToken: IJsonWebToken,
      ) => {
        return new RegisterUseCase(jsonWebToken, addUserUseCase);
      },
      inject: [AddUserUseCase, 'IJsonWebToken'],
    },
    {
      provide: 'IJsonWebToken',
      useClass: JsonWebToken,
    },
    {
      provide: JwtStrategy,
      useFactory: (userRepository: IUserRepository) => {
        return new JwtStrategy(userRepository);
      },
      inject: ['IUserRepository'],
    },
  ],
})
export class AuthModule {}
