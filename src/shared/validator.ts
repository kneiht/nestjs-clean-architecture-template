import { validate } from 'class-validator';

export async function validateOrThrow(
  input: object,
  ErrorClass: new (message: string) => Error,
) {
  const errors = await validate(input);
  if (errors.length > 0) {
    throw new ErrorClass(JSON.stringify(errors));
  }
}

export async function validateSafe(input: object) {
  const errors = await validate(input);
  return errors.length > 0
    ? { ok: false, message: JSON.stringify(errors) }
    : { ok: true, message: 'Valid' };
}
