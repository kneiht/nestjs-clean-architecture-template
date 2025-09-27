import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// Import use cases
import { UploadImageUseCase } from '@/application/use-cases';

// Import Guards
import { JwtAuthGuard } from '@/adapters/nestjs/auth/auth.guard';

@Controller('images')
export class ImagesController {
  constructor(private readonly uploadImageUseCase: UploadImageUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return await this.uploadImageUseCase.execute({ file });
  }
}
