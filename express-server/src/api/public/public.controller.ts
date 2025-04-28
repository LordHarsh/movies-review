import { Request, Response, NextFunction } from 'express';
import { handleGetUserLinks } from './public.service';
import { CONSTANTS } from '../../shared/constants';

export const getUserLinks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userName = req.params.username;
  try {
    const result = await handleGetUserLinks(userName);
    res.status(CONSTANTS.FETCHED_USER_LINKS_SUCCESSFULLY.code).send({
      success: CONSTANTS.FETCHED_USER_LINKS_SUCCESSFULLY.message.success,
      message: CONSTANTS.FETCHED_USER_LINKS_SUCCESSFULLY.message.description,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
