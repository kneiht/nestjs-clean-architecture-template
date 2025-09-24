/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

function formatValidationErrors(errors: ValidationError[]): string {
  const formattedErrors = errors
    .map((error) =>
      error.constraints
        ? `${Object.values(error.constraints)[0]}`
        : 'unknown error',
    )
    .join(', ');
  return formattedErrors;
}

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
    throw new ErrorClass(formatValidationErrors(errors));
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
    ? { ok: false, message: formatValidationErrors(errors) }
    : { ok: true, message: 'Valid' };
}
