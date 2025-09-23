import { SetMetadata } from '@nestjs/common';
import { Role } from '@/entities';

export const ROLES_KEY = 'roles';

// Decorator @Roles('ADMIN', 'USER', ...)
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
