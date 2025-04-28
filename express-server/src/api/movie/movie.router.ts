import { Router } from 'express';
import { addReview, getMovieByImdbId, getMovies, searchMovies } from './movie.controller';
import authenticateToken from '../../shared/middlewares/authenticate';

export default (): Router => {
  const app = Router();
  app.get('/', getMovies);
  app.get('/:imdbId', getMovieByImdbId);
  app.get('/search/:query', searchMovies);
  app.post('/reviews', authenticateToken(), addReview);
  return app;
};
