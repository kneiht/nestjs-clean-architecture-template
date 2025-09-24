/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export async function validateOrThrow(
  input: object,
  ValidationClass: any,
  ErrorClass: new (message: string) => Error,
) {
  // Check if input is an instance of Class
  const instance =
    input instanceof ValidationClass
      ? input
      : plainToInstance(ValidationClass, input);
  const errors = await validate(instance as object);
  if (errors.length > 0) {
    throw new ErrorClass(JSON.stringify(errors));
  }
}

export async function validateSafe(input: object, ValidationClass: any) {
  // Check if input is an instance of Class
  const instance =
    input instanceof ValidationClass
      ? input
      : plainToInstance(ValidationClass, input);

  const errors = await validate(instance as object);
  return errors.length > 0
    ? { ok: false, message: JSON.stringify(errors) }
    : { ok: true, message: 'Valid' };
}
