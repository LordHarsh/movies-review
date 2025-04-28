import { Request, Response, NextFunction } from 'express';
import {
  handleGetLinkById,
  handleUpdateLink,
  handleCreateLink,
  handleGetAllLinks,
  handleDeleteLink,
} from './link.service';
import { CONSTANTS } from '../../shared/constants';

export const getLinks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const links = await handleGetAllLinks(res.locals.user._id);
    if (links) {
      res.status(CONSTANTS.LINK_FETCHED_SUCCESSFULLY.code).send({
        data: links,
        success: CONSTANTS.LINK_FETCHED_SUCCESSFULLY.message.success,
        message: CONSTANTS.LINK_FETCHED_SUCCESSFULLY.message.description,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateLink = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await handleUpdateLink(req.body.platform, req.body.link, res.locals.user._id);
    res.status(CONSTANTS.LINK_UPDATED_SUCCESSFULLY.code).send({
      success: CONSTANTS.LINK_UPDATED_SUCCESSFULLY.success,
      message: CONSTANTS.LINK_UPDATED_SUCCESSFULLY.message,
    });
  } catch (error) {
    next(error);
  }
};

export const createLink = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await handleCreateLink(req.body.platform, req.body.link, res.locals.user._id);
    res.status(CONSTANTS.LINK_CREATED_SUCCESSFULLY.code).send({
      success: CONSTANTS.LINK_CREATED_SUCCESSFULLY.message.success,
      message: CONSTANTS.LINK_CREATED_SUCCESSFULLY.message.description,
    });
  } catch (error) {
    next(error);
  }
};

export const getLinkById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const link = await handleGetLinkById(res.locals.user._id, req.params.id);
    res.status(CONSTANTS.LINK_FETCHED_SUCCESSFULLY.code).send({
      success: CONSTANTS.LINK_FETCHED_SUCCESSFULLY.message.success,
      message: CONSTANTS.LINK_FETCHED_SUCCESSFULLY.message.description,
      data: link,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLinkById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await handleDeleteLink(req.params.id, res.locals.user._id);

    res.status(CONSTANTS.LINK_DELETED_SUCCESSFULLY.code).send({
      success: CONSTANTS.LINK_DELETED_SUCCESSFULLY.success,
      message: CONSTANTS.LINK_DELETED_SUCCESSFULLY.message.description,
    });
  } catch (error) {
    next(error);
  }
};
