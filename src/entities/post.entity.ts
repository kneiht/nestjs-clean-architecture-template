import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { BaseEntity } from './base.entity';

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

  // Factory method to create a new post
  public static create(props: CreatePostDto): Post {
    return new Post(props);
  }

  // Factory method to hydrate a post from existing props
  public static hydrate(props: HydratePostDto): Post {
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
