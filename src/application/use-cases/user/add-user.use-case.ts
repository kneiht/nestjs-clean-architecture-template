import { User, CreateUserDto } from '@/entities';
import { IUserRepository } from '@/application/repositories';
import { IUseCase } from '..';
import {
  failureConflict,
  failureInternal,
  failureValidation,
  successCreated,
  UseCaseReponse,
} from '../response';
import { EntityValidationError, EntityInputValidationError } from '@/entities';
import { validateSafe } from '@/shared/validator';

// Define the use case for adding a user
export class AddUserUseCase implements IUseCase<CreateUserDto> {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: CreateUserDto): Promise<UseCaseReponse<User>> {
    try {
      // Validate the input
      const { ok, message } = await validateSafe(input as object);
      if (!ok) {
        return failureValidation('Input validation failed', message);
      }

      // Check if user with the same email already exists
      const existingUser = await this.userRepository.findByEmail(input.email);
      if (existingUser) {
        return failureConflict('User with this email already exists');
      }

      // Check if user with the same name already exists
      if (input.name) {
        const existingUserWithSameName = await this.userRepository.findByName(
          input.name,
        );
        if (existingUserWithSameName) {
          return failureConflict('User with this name already exists');
        }
      }

      const user = await User.create(input);

      // Add to Repository
      const newUser = await this.userRepository.add(user);

      // Return Success Response
      return successCreated(newUser);
    } catch (error) {
      console.error(error);
      if (error instanceof EntityInputValidationError) {
        return failureValidation('Input validation failed', error.message);
      }
      if (error instanceof EntityValidationError) {
        return failureValidation('Entity validation failed', error.message);
      }
      return failureInternal('Failed to create entity');
    }
  }
}
