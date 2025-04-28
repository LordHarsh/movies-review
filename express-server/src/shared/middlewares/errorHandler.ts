import { NextFunction, Request, Response } from 'express';
import { ERRORS } from '../errors';
import LoggerInstance from '../../loaders/logger';

export interface ApiError extends Error {
  message: string;
  statusCode?: number;
}

export const errorHandler = (error: ApiError, _req: Request, res: Response, next: NextFunction) => {
  LoggerInstance.error(error);
  res.status(error.statusCode ?? ERRORS.SERVER_ERROR.code).json({
    success: ERRORS.SERVER_ERROR.success,
    message: error.message ?? ERRORS.SERVER_ERROR.message,
  });
};
