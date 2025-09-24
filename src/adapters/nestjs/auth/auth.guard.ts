import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '@/entities';

import { Request } from 'express';
import { UserInRequest } from './auth.dto';
type RequestWithUser = Request & { user: UserInRequest };

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get required roles from metadata of route
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If route doesn't require any role, allow access
    if (!requiredRoles) {
      return true;
    }

    // Get user from request (added by JwtAuthGuard)
    const { user }: RequestWithUser = context.switchToHttp().getRequest();

    // Check if user role is in required roles
    return requiredRoles.some((role) => user.role === role);
  }
}
