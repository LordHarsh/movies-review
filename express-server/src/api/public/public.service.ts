import database from '../../loaders/database';
import { ERRORS } from '../../shared/errors';

export const handleGetUserLinks = async (username: string): Promise<unknown> => {
  const db = await database();
  const user = await db.collection('users').findOne(
    { userName: username, isDeleted: false },
    {
      projection: {
        userName: 1,
        firstName: 1,
        lastName: 1,
        _id: 1,
        email: 1,
        isDeleted: 1,
      },
    },
  );
  if (!user) {
    throw {
      statusCode: ERRORS.USER_NOT_FOUND_ERROR.code,
      message: ERRORS.USER_NOT_FOUND_ERROR.message.error_description,
    };
  }
  const userId = user._id;
  const links = await db
    .collection('links')
    .find(
      { user_id: userId, isDeleted: false },
      {
        projection: {
          _id: 1,
          platform: 1,
          link: 1,
          isDeleted: 1,
        },
      },
    )
    .toArray();
  if (!links) {
    throw {
      statusCode: ERRORS.LINK_NOT_FOUND_ERROR.code,
      message: ERRORS.LINK_NOT_FOUND_ERROR.message.error_description,
    };
  }
  return { user, links };
};
