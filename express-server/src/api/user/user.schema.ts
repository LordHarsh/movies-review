import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  bio: z.string(),
  birthday: z.string(),
  image: z.string().optional(),
  pronouns: z.string(),
  website: z.string().optional(),
});

export type userType = z.infer<typeof userSchema>;
