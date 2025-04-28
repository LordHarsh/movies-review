import { Router } from 'express';
import { addToWatchlist, deleteUser, getUser, getUsers, getUserWatchlist, removeFromWatchlist, updateUser } from './user.controller';

import { upload } from '../../shared/utils/multer';
import authenticateToken from '../../shared/middlewares/authenticate';
import { validateRequest } from '../../shared/middlewares/validator';
import { userSchema } from './user.schema';

export default (): Router => {
  const app = Router();
  app.get('/watchlist', authenticateToken(), getUserWatchlist);
  app.post('/watchlist', authenticateToken(), addToWatchlist);
  app.delete('/watchlist', authenticateToken(), removeFromWatchlist);
  // app.get('/users', getUsers);
  // app.get('/user', authenticateToken(), getUser);
  return app;
};
