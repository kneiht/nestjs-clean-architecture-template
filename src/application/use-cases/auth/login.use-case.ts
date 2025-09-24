import { env } from '@/config/environment';
import { IUseCase } from '..';

import { Role } from '@/entities/user.entity';
import { LoginUseCaseDto, LoginUseCaseData } from './auth.dto';
import { IUserRepository } from '@/application/repositories';

import {
  failureInternal,
  failureUnauthorized,
  successOk,
  UseCaseReponse,
} from '../response';

import {
  ExpiresIn,
  IJsonWebToken,
  JwtPayload,
} from '@/application/services/jwt.service';
import { validateSafe } from '@/shared/validator';

// Define the use case
export class LoginUseCase implements IUseCase<LoginUseCaseDto> {
  constructor(
    private userRepository: IUserRepository,
    private jsonWebToken: IJsonWebToken,
  ) {}

  async execute(
    input: LoginUseCaseDto,
  ): Promise<UseCaseReponse<LoginUseCaseData>> {
    try {
      // Validate the input
      const { ok, message } = await validateSafe(input as object);
      if (!ok) {
        return failureUnauthorized('Input validation failed', message);
      }

      // Find user by email
      const user = await this.userRepository.findByEmail(input.email);
      if (!user) {
        return failureUnauthorized('Invalid email or password');
      }

      // Verify password
      const isPasswordValid = user.verifyPassword(input.password);
      if (!isPasswordValid) {
        return failureUnauthorized('Invalid email or password');
      }

      // Create JWT payload
      const payload: JwtPayload = {
        id: user.id,
        email: user.email,
        name: user.name ?? undefined,
        role: user.role ?? Role.USER,
      };

      // Sign tokens
      const accessToken = await this.jsonWebToken.sign(
        payload,
        env.JWT_ACCESS_EXPIRES_IN as ExpiresIn,
      );
      const refreshToken = await this.jsonWebToken.sign(
        payload,
        env.JWT_REFRESH_EXPIRES_IN as ExpiresIn,
      );

      // Return success response with user and tokens
      return successOk({
        user,
        token: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      // Handle other errors
      console.log(error);
      return failureInternal('Failed to login');
    }
  }
}
