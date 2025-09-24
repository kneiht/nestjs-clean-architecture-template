import { IUseCase } from '..';

import { Role } from '@/entities';
import { IUserRepository } from '@/application/repositories';
import { IJsonWebToken } from '@/application/services/jwt.service';
import { CheckAuthUseCaseData, CheckAuthUseCaseDto } from './auth.dto';

import { failureUnauthorized, successOk, UseCaseReponse } from '../response';
import { validateSafe } from '@/shared/validator';

// Define data for the response

// Define the use case
export class CheckAuthUseCase implements IUseCase<CheckAuthUseCaseDto> {
  constructor(
    private jsonWebToken: IJsonWebToken,
    private userRepository: IUserRepository,
  ) {}

  // Execute the use case
  async execute(
    input: CheckAuthUseCaseDto,
  ): Promise<UseCaseReponse<CheckAuthUseCaseData>> {
    // Catch any errors
    try {
      // Validate the input
      const { ok, message } = await validateSafe(
        input as object,
        CheckAuthUseCaseDto,
      );
      if (!ok) {
        return failureUnauthorized('Input validation failed', message);
      }

      const { token, roleToCheck } = input;

      // Verify the token
      const payload = await this.jsonWebToken.verify(token);
      if (!payload) {
        return failureUnauthorized('Invalid token payload');
      }

      // Find the user by ID
      const user = await this.userRepository.findById(payload.id);
      if (!user) {
        return failureUnauthorized('User not found');
      }

      // Check role, Admin has access to all roles
      if (user.role != Role.ADMIN) {
        if (user.role !== roleToCheck) {
          return failureUnauthorized('User role does not match');
        }
      }

      // Return the user
      return successOk(user);
    } catch (error) {
      console.log(error);
      return failureUnauthorized('Authentication failed');
    }
  }
}
