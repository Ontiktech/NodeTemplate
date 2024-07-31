import { z } from 'zod';

export const registrationReqeustSchema = z.object({
  email: z.string().email().nullable().optional(),
  password: z.string().min(8).max(128).nullable().optional(),
  phone: z.string().nullable().optional(),
  provider: z.string().nullable().optional(),
  token: z.string().nullable().optional(),
  username: z.string().nullable().optional(),
});

export type RegistrationRequestSchema = z.infer<
  typeof registrationReqeustSchema
>;
