import database from '../../loaders/database';
import { userType } from './user.schema';
import { s3 } from '../../shared/utils/aws';
import config from '../../config';
import { CONSTANTS } from '../../shared/constants';

export const handleGetUser = async (email: string): Promise<unknown> => {
  const collection = (await database()).collection('users');
  return await collection.findOne({ email }, { projection: { password: 0 } });
};

export const handleDeleteUser = async (email: string): Promise<void> => {
  const collection = (await database()).collection('users');
  const user = await collection.findOne({ email });
  if (!user) {
    throw { status: 404, message: 'User not found' };
  }
  await collection.updateOne({ email }, { $set: { isDeleted: true } });
};

export const handleGetUsers = async (): Promise<unknown> => {
  const collection = (await database()).collection('users');
  return await collection.find({}, { projection: { password: 0 } }).toArray();
};

export const handleUpdateUser = async (file: Express.Multer.File, user: userType): Promise<void> => {
  if (file) {
    const fileContent = file.buffer;
    const params = {
      Bucket: config.AWS.bucketName,
      Key: `${Date.now()}_${file.originalname}`,
      Body: fileContent,
      ContentType: file.mimetype,
    };
    const uploadObject = await s3.upload(params).promise();
    user.image = uploadObject.Location;
  } else if (!user.image) {
    user.image = `${CONSTANTS.AVATAR_URL.url_prefix}${user.firstName}${CONSTANTS.AVATAR_URL.url_suffix}`;
  }
  const collection = (await database()).collection('users');
  await collection.updateOne({ email: user.email }, { $set: user });
};


export const handleGetUserWatchlist = async (email: string): Promise<unknown> => {
  const collection = (await database()).collection('users');
  const user = await collection.findOne({ email }, { projection: { watchlist: 1 } });
  if (!user) {
    throw { status: 404, message: 'User not found' };
  }
  const watchlist = (await database()).collection('movies').find({ imdbId: { $in: user.watchlist } }).toArray();
  return watchlist;
}

export const handleRemoveFromWatchlist = async (email: string, imdbId: string): Promise<void> => {
  const collection = (await database()).collection('users');
  await collection.updateOne({ email }, { $pull: { watchlist: imdbId } });
}

export const handleAddToWatchlist = async (email: string, imdbId: string): Promise<void> => {
  const collection = (await database()).collection('users');
  const user = await collection.findOne({ email }, { projection: { watchlist: 1 } });
  if (!user) {
    throw { status: 404, message: 'User not found' };
  }
  if (user.watchlist.includes(imdbId)) {
    throw { status: 400, message: 'Movie already in watchlist' };
  } else {
    await collection.updateOne({ email }, { $push: { watchlist: imdbId } });
  } 
} 