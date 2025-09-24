import { User, UpdateUserDto } from '@/entities';
import { IUserRepository } from '@/application/repositories';
import { IUseCase } from '@/application/use-cases';
import {
  failureConflict,
  failureInternal,
  failureNotFound,
  failureValidation,
  successOk,
  UseCaseReponse,
} from '@/application/use-cases/response';
import { EntityValidationError, EntityInputValidationError } from '@/entities';
import { validateSafe } from '@/shared/validator';

// Define the use case
export class UpdateUserUseCase implements IUseCase<UpdateUserDto> {
  constructor(private userRepository: IUserRepository) {}

  // Execute the use case
  async execute(input: UpdateUserDto): Promise<UseCaseReponse<User>> {
    try {
      // Validate the input
      const { ok, message } = await validateSafe(
        input as object,
        UpdateUserDto,
      );
      if (!ok) {
        return failureValidation('Input validation failed', message);
      }

      const { id, ...updatePayload } = input;

      // Fetch the existing entity
      const user = await this.userRepository.findById(id);
      if (!user) {
        return failureNotFound(`User with ID ${id} not found`);
      }

      // Check if user with the same name
      if (updatePayload.name) {
        const existingUserWithSameName = await this.userRepository.findByName(
          updatePayload.name,
        );
        if (existingUserWithSameName && existingUserWithSameName.id !== id) {
          return failureConflict('User with this name already exists');
        }
      }

      // Update the entity and validate
      Object.assign(user, updatePayload);
      user.updatedAt = new Date();
      await user.validate();

      // Save the updated entity
      const updatedEntity = await this.userRepository.update(user);

      // Return success response
      return successOk(updatedEntity);
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
