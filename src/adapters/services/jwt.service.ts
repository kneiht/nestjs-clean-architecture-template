import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ExpiresIn,
  IJsonWebToken,
  JwtPayload,
} from '@/application/services/jwt.service';

@Injectable()
export class JsonWebToken implements IJsonWebToken {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: JwtPayload, expiresIn: ExpiresIn): Promise<string> {
    return this.jwtService.signAsync(payload, { expiresIn });
  }

  async verify(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token);
  }
}