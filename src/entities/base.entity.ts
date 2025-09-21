/* eslint-disable @typescript-eslint/no-unused-vars */
import { uuidv7 } from 'uuidv7';

// Define BaseEntity
export abstract class BaseEntity {
  // Properties that are common to all entities
  public readonly id: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  // Constructor that initializes common properties
  // It is protected to prevent direct instantiation
  // Add static methods create and from to create entities
  protected constructor(props: {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = props.id ?? BaseEntity.idGenerator();
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  // Method to convert entity to JSON
  public abstract toJSON(): any;

  // Static method to generate a unique ID
  static idGenerator(): string {
    return uuidv7();
  }
}
