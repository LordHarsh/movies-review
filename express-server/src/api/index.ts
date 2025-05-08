import { Router } from 'express';
import userRouter from './user/user.router';
import authRouter from './auth/auth.router';
import linkRouter from './link/link.router';
import publicRouter from './public/public.router';
import authenticateToken from '../shared/middlewares/authenticate';
import movieRouter from './movie/movie.router';

export default (): Router => {
  const app = Router();
  app.use('/user', userRouter());
  app.use('/auth', authRouter());
  app.use('/movies', movieRouter());
  // app.use('/link', authenticateToken(), linkRouter());
  // app.use('/public', publicRouter());
  return app;
};
