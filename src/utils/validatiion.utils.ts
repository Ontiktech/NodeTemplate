import { z } from 'zod';

export const validateRequestBody =
  (schema: any) => (req: any, res: any, next: any) => {
    try {
      schema.parse({ body: req.body });
      next();
    } catch (error: any) {
      res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: error.errors.map((e: any) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      });
    }
  };

export function validateBody<T>(
  eventBody: string | null | undefined,
  schema: z.ZodSchema,
): undefined | T {
  if (!eventBody) {
    return undefined;
  }

  try {
    const parsedBody = JSON.parse(eventBody);
    const validation = schema.safeParse(parsedBody);

    if (!validation.success) {
      console.log('zod validation failed', validation.error);
      return undefined;
    }
    return validation.data;
  } catch (e) {
    console.error('unable to validate body', e);
    return undefined;
  }
}

export function validateObject<T>(
  obj: unknown,
  schema: z.ZodSchema,
): undefined | T {
  if (!obj) {
    return undefined;
  }
  try {
    const validation = schema.safeParse(obj);

    if (!validation.success) {
      console.log('zod validation failed', validation.error);
      return undefined;
    }
    return validation.data;
  } catch (e) {
    console.error('unable to validate body', e);
    return undefined;
  }
}
