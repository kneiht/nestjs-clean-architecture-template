import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { BaseEntity } from './base.entity';
import { EntityInputValidationError } from './entity.errors';
import { validateOrThrow } from '@/shared/validator';

// Define CreatePostDto
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

// Define HydratePostDto
export class HydratePostDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class UpdatePostDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}

// Define Post
export class Post extends BaseEntity {
  // Properties that are specific to Post entity
  @IsOptional()
  @MinLength(3)
  @IsString()
  public title: string | null;

  @IsOptional()
  @IsString()
  public content: string | null;

  // Constructor that initializes specific properties
  protected constructor(props: Partial<Post>) {
    super(props);
    this.title = props.title ?? null;
    this.content = props.content ?? null;
  }

  // Factory method to create a new post
  public static async create(props: CreatePostDto): Promise<Post> {
    await validateOrThrow(props, EntityInputValidationError);
    return new Post(props);
  }

  // Factory method to hydrate a post from existing props
  public static async hydrate(props: HydratePostDto): Promise<Post> {
    await validateOrThrow(props, EntityInputValidationError);
    return new Post(props);
  }

  // toJSON
  public toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
