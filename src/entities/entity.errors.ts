export class EntityValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EntityValidationError';
  }
}

export class InputValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InputError';
  }
}
