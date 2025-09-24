import { env } from '@/config/environment';
import { IUseCase } from '..';

import { CreateUserDto, Role } from '@/entities';
import { AddUserUseCase } from '../user/add-user.use-case';
import { RegisterUseCaseData, RegisterUseCaseDto } from './auth.dto';

import {
  failureInternal,
  failureUnauthorized,
  successCreated,
  UseCaseReponse,
} from '../response';

import {
  ExpiresIn,
  IJsonWebToken,
  JwtPayload,
} from '@/application/services/jwt.service';
import { validateSafe } from '@/shared/validator';

// Define the use case
export class RegisterUseCase implements IUseCase<RegisterUseCaseDto> {
  constructor(
    private jsonWebToken: IJsonWebToken,
    private addUserUseCase: AddUserUseCase,
  ) {}

  async execute(
    input: RegisterUseCaseDto,
  ): Promise<UseCaseReponse<RegisterUseCaseData>> {
    try {
      // Validate the input
      const { ok, message } = await validateSafe(
        input as object,
        RegisterUseCaseDto,
      );
      if (!ok) {
        return failureUnauthorized('Input validation failed', message);
      }

      // Use AddUserUseCase to create the user
      const addUserResponse = await this.addUserUseCase.execute(
        input as CreateUserDto,
      );

      // If user creation failed
      if (!addUserResponse.success || !addUserResponse.data) {
        const registerResponse = { data: undefined, ...addUserResponse };
        return registerResponse as UseCaseReponse<RegisterUseCaseData>;
      }

      // If successful, create tokens
      const user = addUserResponse.data;
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
      return successCreated({
        user,
        token: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      // Handle other errors
      console.log(error);
      return failureInternal('Failed to register');
    }
  }
}
