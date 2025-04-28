import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../jwt';
import database from '../../loaders/database';

export default function authenticateToken() {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader?.split(' ')[1];
      if (!token) {
        throw { statusCode: 401, message: 'Token Not Found' };
      }
      const { email } = verifyToken(token);
      const data = await (await database()).collection('users').findOne({ email });
      if (!data) {
        throw { statusCode: 404, message: 'User Not Found' };
      }
      res.locals.user = data;
      next();
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  };
}
