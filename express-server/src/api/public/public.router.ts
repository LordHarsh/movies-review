import { Router } from 'express';
import { getUserLinks } from './public.controller';

export default (): Router => {
  const app = Router();
  app.get('/:username', getUserLinks);
  return app;
};
