import { uuidv7 } from 'uuidv7';
import { IsDate, IsUUID } from 'class-validator';

// Define BaseEntity
export abstract class BaseEntity {
  // Properties that are common to all entities
  @IsUUID()
  public readonly id: string;
  @IsDate()
  public readonly createdAt: Date;
  @IsDate()
  public updatedAt: Date;

  // Constructor that initializes common properties
  // It is protected to prevent direct instantiation
  // Add static methods create and from to create entities
  protected constructor(props: Partial<BaseEntity>) {
    this.id = props.id ?? BaseEntity.idGenerator();
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  // Static method to generate a unique ID
  static idGenerator(): string {
    return uuidv7();
  }

  // Method to convert entity to JSON
  public abstract toJSON(): {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
