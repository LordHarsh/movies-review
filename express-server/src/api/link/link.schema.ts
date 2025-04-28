import { z } from 'zod';

export const createLinkSchema = z.object({
  platform: z.string(),
  link: z.string().url(),
});

export const getLinkByIdSchema = z.object({
  id: z.string().length(24),
});

export const deleteLinkSchema = z.object({
  id: z.string().length(24),
});

export const updateLinkSchema = z.object({
  link: z.string().url(),
  platform: z.string(),
});
