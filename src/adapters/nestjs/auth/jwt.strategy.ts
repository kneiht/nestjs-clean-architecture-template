import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { env } from '@/config/environment';
import { JwtPayload } from '@/application/services/jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_SECRET,
    });
  }

  // This method runs when a valid JWT is found
  async validate(payload: JwtPayload) {
    // TODO: Need to check if the user exist in the database
    // TODO: Need to check if the user is active
    // TODO: Check if the role is valid in database
    // TODO: Add type for user
    const user = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    };

    return Promise.resolve(user);
  }
}
