import { NextFunction, Request, Response } from 'express';
import { handleLoginUser, handleUpdatePassword } from './auth.service';
import { handleCreateUser } from './auth.service';
import { CONSTANTS } from '../../shared/constants';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await handleCreateUser(req.body.name, req.body.email, req.body.password);
    res.status(CONSTANTS.USER_CREATED_SUCCESSFULLY.code).send({
      success: CONSTANTS.USER_CREATED_SUCCESSFULLY.success,
      message: CONSTANTS.USER_CREATED_SUCCESSFULLY.message.msg,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userObj = { email: req.body.email, password: req.body.password };
    const user = await handleLoginUser(userObj.email, userObj.password);
    res.status(CONSTANTS.USER_LOGGED_IN_SUCCESSFULLY.code).json({
      success: CONSTANTS.USER_LOGGED_IN_SUCCESSFULLY.message.success,
      message: CONSTANTS.USER_LOGGED_IN_SUCCESSFULLY.message.description,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const email = res.locals.user.email;
    const { oldPassword, newPassword } = req.body;
    const new_token = await handleUpdatePassword(email, oldPassword, newPassword);
    res.status(CONSTANTS.UPDATED_PASSWORD_SUCCESSFULLY.code).json({
      success: CONSTANTS.UPDATED_PASSWORD_SUCCESSFULLY.message.success,
      message: CONSTANTS.UPDATED_PASSWORD_SUCCESSFULLY.message.description,
      jwt: new_token,
    });
  } catch (error) {
    next(error);
  }
};
