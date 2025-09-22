import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

// Import use cases
import {
  GetAllUseCase,
  GetByIdUseCase,
  AddUseCase,
  UpdateUseCase,
  DeleteByIdUseCase,
} from '@/application/use-cases';

// Import dtos
import { CreatePostDto, UpdatePostDto } from './posts.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly getAllUseCase: GetAllUseCase,
    private readonly getByIdUseCase: GetByIdUseCase,
    private readonly addUseCase: AddUseCase<CreatePostDto>,
    private readonly updateUseCase: UpdateUseCase<UpdatePostDto>,
    private readonly deleteByIdUseCase: DeleteByIdUseCase,
  ) {}

  @Get()
  async findAll() {
    return await this.getAllUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    console.log('findById', id);
    return await this.getByIdUseCase.execute(id);
  }

  @Post()
  async add(@Body() dto: CreatePostDto) {
    return await this.addUseCase.execute(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Omit<UpdatePostDto, 'id'>,
  ) {
    return await this.updateUseCase.execute({ ...dto, id } as UpdatePostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteByIdUseCase.execute(id);
  }
}
