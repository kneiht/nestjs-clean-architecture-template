import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseEntity } from './base.entity';
import {
  EntityInputValidationError,
  EntityValidationError,
} from './entity.errors';
import { validateOrThrow } from '@/shared/validator';

// Define CreateImageDto
export class CreateImageDto {
  @IsString()
  url: string;
}

// Define HydrateImageDto
export class HydrateImageDto {
  @IsUUID()
  id: string;

  @IsString()
  url: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

// Define UpdateImageDto
export class UpdateImageDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  url?: string;
}

// Define Image
export class Image extends BaseEntity {
  @IsString()
  public url: string;

  protected constructor(props: Partial<Image>) {
    super(props);
    this.url = props.url ?? '';
  }

  public async validate(): Promise<void> {
    await validateOrThrow(this, Image, EntityValidationError);
  }

  public static async create(props: CreateImageDto): Promise<Image> {
    await validateOrThrow(props, CreateImageDto, EntityInputValidationError);
    return new Image(props);
  }

  public static async hydrate(props: HydrateImageDto): Promise<Image> {
    await validateOrThrow(props, CreateImageDto, EntityInputValidationError);
    return new Image(props);
  }

  public toJSON() {
    return {
      id: this.id,
      url: this.url,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
