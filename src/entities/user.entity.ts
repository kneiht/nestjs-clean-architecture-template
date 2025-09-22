import { validate } from 'class-validator';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { BaseEntity } from './base.entity';
import { EntityValidationError } from './entity.errors';
import bcrypt from 'node_modules/bcryptjs';

// Define CreateUserDto
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

// Define HydrateUserDto
export class HydrateUserDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  hashedPassword: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class UpdateUserDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;
}

// Define User
export class User extends BaseEntity {
  // Properties that are specific to User entity
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  public name: string | null;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  private readonly hashedPassword: string;

  // Constructor that initializes specific properties
  protected constructor(
    props: Partial<User> & { email: string; hashedPassword: string },
  ) {
    super(props);
    this.name = props.name ?? null;
    this.email = props.email;
    this.hashedPassword = props.hashedPassword;
  }

  // Validate
  public async validate(): Promise<void> {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new EntityValidationError(JSON.stringify(errors));
    }
  }

  // Factory method to create a new user
  public static async create(props: CreateUserDto): Promise<User> {
    await validate(props);
    const userProps = {
      ...props,
      hashedPassword: await bcrypt.hash(props.password, 10),
    };
    return new User(userProps);
  }

  // Factory method to hydrate a user from existing props
  public static async hydrate(props: HydrateUserDto): Promise<User> {
    await validate(props);
    return new User(props);
  }

  // toJSON
  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
