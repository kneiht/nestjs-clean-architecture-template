import { uuidv7 } from 'uuidv7';

// Define BaseEntityProps
export interface BaseEntityProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define BaseEntity
export abstract class BaseEntity implements BaseEntityProps {
  // Properties that are common to all entities
  public readonly id: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  // Constructor that initializes common properties
  // It is protected to prevent direct instantiation
  // Add static methods create and from to create entities
  protected constructor(props: Partial<BaseEntityProps>) {
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
