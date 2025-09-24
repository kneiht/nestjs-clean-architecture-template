import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { env } from '@/config/environment';
import { JwtPayload } from '@/application/services/jwt.service';
import { UserInRequest } from './auth.dto';
import { type IUserRepository } from '@/application/repositories';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: IUserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }

  // This method runs when a valid JWT is found
  async validate(payload: JwtPayload) {
    // Check if user exist in database
    const user = await this.userRepository.findById(payload.id);
    if (!user) {
      return null;
    }

    // Check if user role is valid
    if (user.role !== payload.role) {
      return null;
    }

    // TODO: Need to check if the user is active

    const userInRequest: UserInRequest = {
      id: payload.id,
      name: payload.name ?? '',
      email: payload.email,
      role: payload.role,
    };

    return Promise.resolve(userInRequest);
  }
}
