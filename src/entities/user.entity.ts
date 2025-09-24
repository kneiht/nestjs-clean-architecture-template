import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { BaseEntity } from './base.entity';
import { EntityInputValidationError } from './entity.errors';
import bcrypt from 'node_modules/bcryptjs';
import { validateOrThrow } from '@/shared/validator';
import { env } from '@/config/environment';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

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

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
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

  @IsEnum(Role)
  role: Role;

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

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
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

  @IsEnum(Role)
  public role: Role;

  private readonly hashedPassword: string;

  // Constructor that initializes specific properties
  protected constructor(
    props: Partial<User> & {
      email: string;
      hashedPassword: string;
      role: Role;
    },
  ) {
    super(props);
    this.name = props.name ?? null;
    this.email = props.email;
    this.hashedPassword = props.hashedPassword;
    this.role = props.role;
  }

  // Factory method to create a new user
  public static async create(props: CreateUserDto): Promise<User> {
    await validateOrThrow(props, EntityInputValidationError);
    const userProps = {
      ...props,
      hashedPassword: await bcrypt.hash(
        props.password,
        Number(env.BCRYPT_ROUNDS),
      ),
      role: props.role ?? Role.USER,
    };
    return new User(userProps);
  }

  // Factory method to hydrate a user from existing props
  public static async hydrate(props: HydrateUserDto): Promise<User> {
    await validateOrThrow(props, EntityInputValidationError);
    return new User(props);
  }

  // Verify password
  public verifyPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.hashedPassword);
  }

  // toJSON
  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
