import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { BaseEntity } from './base.entity';
import { EntityValidationError } from './entity.errors';

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
  private constructor(props: Partial<Post>) {
    super(props);
    this.title = props.title ?? null;
    this.content = props.content ?? null;
  }

  // Validate
  public async validate(): Promise<void> {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new EntityValidationError(JSON.stringify(errors));
    }
  }

  // Factory method to create a new post
  public static async create(props: CreatePostDto): Promise<Post> {
    await validate(props);
    return new Post(props);
  }

  // Factory method to hydrate a post from existing props
  public static async hydrate(props: HydratePostDto): Promise<Post> {
    await validate(props);
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
