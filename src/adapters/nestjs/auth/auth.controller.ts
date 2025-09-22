import { Body, Controller, Post } from '@nestjs/common';

// Import use cases
import { LoginUseCase, RegisterUseCase } from '@/application/use-cases';

// Import DTOs
import { LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.loginUseCase.execute(dto);
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.registerUseCase.execute(dto);
  }
}
