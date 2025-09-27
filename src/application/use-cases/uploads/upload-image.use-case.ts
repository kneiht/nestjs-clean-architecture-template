import { IImageUploadService } from '@/application/services/image-upload.service';
import { IImageRepository } from '@/application/repositories';
import { IUseCase } from '..';
import { failureInternal, successCreated, UseCaseReponse } from '../response';
import { Image } from '@/entities';

export interface UploadImageInput {
  file: unknown;
}

export class UploadImageUseCase implements IUseCase<UploadImageInput> {
  constructor(
    private readonly imageUploadService: IImageUploadService,
    private readonly imageRepository: IImageRepository,
  ) {}

  async execute(input: UploadImageInput): Promise<UseCaseReponse<Image>> {
    try {
      // Upload image
      const imageUrl = await this.imageUploadService.upload(input.file);

      // Create Image entity
      const image = await Image.create({ url: imageUrl.url });
      const savedImage = await this.imageRepository.add(image);

      // Return success response
      return successCreated(savedImage);
    } catch (error) {
      console.error(error);
      return failureInternal('Failed to upload image');
    }
  }
}
