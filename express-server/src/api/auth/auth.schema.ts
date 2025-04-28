import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().max(30),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().max(30),
});

export const updatePasswordSchema = z.object({
  oldPassword: z.string().max(30),
  newPassword: z.string().max(30),
});
