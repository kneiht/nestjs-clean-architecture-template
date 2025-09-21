import { BaseEntity, BaseEntityProps } from './base.entity';

// Define PostProps
export interface PostProps extends BaseEntityProps {
  title: string | null;
  content: string | null;
}

// Define CreatePostDto
export interface CreatePostDto {
  title: string;
  content: string;
}

// Define HydratePostDto
export interface HydratePostDto {
  id: string;
  title?: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Post extends BaseEntity implements PostProps {
  // Properties that are specific to Post entity
  public title: string | null;
  public content: string | null;

  // Constructor that initializes specific properties
  private constructor(props: Partial<PostProps>) {
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
