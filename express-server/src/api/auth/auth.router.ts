import { Router } from 'express';
import { createUser } from './auth.controller';
import { loginUser, updatePassword } from './auth.controller';
import { validateRequest } from '../../shared/middlewares/validator';
import { createUserSchema, loginUserSchema, updatePasswordSchema } from './auth.schema';
import authenticateToken from '../../shared/middlewares/authenticate';

export default (): Router => {
  const app = Router();
  app.post('/signup', validateRequest('body', createUserSchema), createUser);
  app.post('/login', validateRequest('body', loginUserSchema), loginUser);
  // app.put('/update-password', validateRequest('body', updatePasswordSchema), authenticateToken(), updatePassword);
  return app;
};
