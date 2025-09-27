import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';

// Import Repository
import { IImageRepository } from '@/application/repositories';
import { ImageRepository } from '@/adapters/repositories';

// Import Service
import { IImageUploadService } from '@/application/services/image-upload.service';
import { ImageUploadService } from '@/adapters/services/image-upload.service';

// Import UseCase
import { UploadImageUseCase } from '@/application/use-cases';

@Module({
  controllers: [ImagesController],
  providers: [
    {
      provide: 'IImageRepository',
      useClass: ImageRepository,
    },
    {
      provide: 'IImageUploadService',
      useClass: ImageUploadService,
    },
    {
      provide: UploadImageUseCase,
      useFactory: (
        imageUploadService: IImageUploadService,
        imageRepository: IImageRepository,
      ) => {
        return new UploadImageUseCase(imageUploadService, imageRepository);
      },
      inject: ['IImageUploadService', 'IImageRepository'],
    },
  ],
})
export class ImagesModule {}
