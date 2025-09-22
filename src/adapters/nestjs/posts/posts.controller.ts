import { Body, Controller, Get } from '@nestjs/common';
import { GetAllUseCase } from '@/application/use-cases';

@Controller('posts')
export class PostsController {
  constructor(private readonly getAllUseCase: GetAllUseCase) {}

  @Get()
  async findAll() {
    return await this.getAllUseCase.execute();
  }
}
