import { Router } from 'express';
import { updateLink, getLinkById, createLink, getLinks, deleteLinkById } from './link.controller';
import { createLinkSchema, getLinkByIdSchema, updateLinkSchema } from './link.schema';
import { validateRequest } from '../../shared/middlewares/validator';

export default (): Router => {
  const app = Router();
  app.post('/create', validateRequest('body', createLinkSchema), createLink);
  app.put('/', validateRequest('body', updateLinkSchema), updateLink);
  app.get('/:id', validateRequest('params', getLinkByIdSchema), getLinkById);
  app.get('/', getLinks);
  app.delete('/:id', validateRequest('params', updateLinkSchema), deleteLinkById);
  return app;
};
