import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ERRORS } from '../errors';

type RequestLocation = 'query' | 'body' | 'params';

export function validateRequest(location: RequestLocation, schema: z.AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
    try {
      console.log('Request body:', req.body);
      const validatedSchema = await schema.parseAsync(req[location]);
      req[location] = validatedSchema;
      next();
    } catch (error) {
      return res.status(ERRORS.MISDIRECTED_REQUEST.code).json({
        success: ERRORS.MISDIRECTED_REQUEST.success,
        error,
      });
    }
  };
}
