import {
  LoginUseCaseDto as LoginDto,
  RegisterUseCaseDto as RegisterDto,
} from '@/application/use-cases/auth/auth.dto';
import { Role } from '@/entities';

// Re-export LoginDto and RegisterDto
export { LoginDto, RegisterDto };

export type UserInRequest = {
  id: string;
  name: string;
  email: string;
  role: Role;
};
