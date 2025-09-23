import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

// Import generic use cases
import {
  GetAllUseCase,
  GetByIdUseCase,
  DeleteByIdUseCase,
} from '@/application/use-cases';

// Import specific use cases
import { AddUserUseCase, UpdateUserUseCase } from '@/application/use-cases';

// Import DTOs
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { JwtAuthGuard, RolesGuard } from '../auth/auth.guard';
import { Role } from '@/entities';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly addUserUseCase: AddUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserAllUseCase: GetAllUseCase,
    private readonly getUserByIdUseCase: GetByIdUseCase,
    private readonly deleteUserByIdUseCase: DeleteByIdUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getAll() {
    return await this.getUserAllUseCase.execute();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.getUserByIdUseCase.execute(id);
  }

  @Post()
  async add(@Body() dto: CreateUserDto) {
    return await this.addUserUseCase.execute(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Omit<UpdateUserDto, 'id'>,
  ) {
    return await this.updateUserUseCase.execute({ ...dto, id });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteUserByIdUseCase.execute(id);
  }
}
