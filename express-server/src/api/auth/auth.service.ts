import database from '../../loaders/database';
import bcrypt from 'bcrypt';
import generateToken from '../../shared/jwt';
import { ERRORS } from '../../shared/errors';
import { generateUsername } from '../../shared/utils/username.generator';

export const handleCreateUser = async (
  name: string,
  email: string,
  password: string,
): Promise<unknown> => {
  const collection = (await database()).collection('users');
  const user = await collection.findOne({ email });
  if (user) {
    throw {
      statusCode: ERRORS.USER_ALREADY_EXISTS_ERROR.code,
      message: ERRORS.USER_ALREADY_EXISTS_ERROR.message.error_description,
    };
  }

  let userName = generateUsername(name);
  let checkExsistingUsername = collection.findOne({ userName });
  while (checkExsistingUsername) {
    userName = generateUsername(name);
    checkExsistingUsername = await collection.findOne({ userName });
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  await collection.insertOne({
    userName,
    name,
    email,
    password: hash,
    isDeleted: false,
    role: "USER",
    watchlist: [],
  });
  return { name, email, token: generateToken(email) };
};

export const handleLoginUser = async (email: string, password: string): Promise<unknown> => {
  console.log('email', email);
  console.log('password', password);
  const data = await (await database()).collection('users').findOne({ email: email });
  if (!data) {
    throw { statusCode: 404, message: 'User Does Not Exist' };
  }

  const res = await bcrypt.compare(password, data.password);
  if (!res) {
    throw { statusCode: 401, message: 'Incorrect Password / Not Allowed' };
  }

  return { name: data.name, email, token: generateToken(email) };
};

export const handleUpdatePassword = async (
  email: string,
  oldPassword: string,
  newPassword: string,
): Promise<unknown> => {
  const user = await (await database()).collection('users').findOne({ email: email });
  if (!user) {
    throw {
      statusCode: ERRORS.USER_NOT_FOUND_ERROR.code,
      message: ERRORS.USER_NOT_FOUND_ERROR.message.error_description,
    };
  }
  if (oldPassword === newPassword) {
    throw {
      statusCode: ERRORS.SAME_PASSWORD.code,
      error: ERRORS.SAME_PASSWORD.message.error_description,
    };
  }
  const value = await bcrypt.compare(oldPassword, user.password);
  if (!value) {
    throw {
      statusCode: ERRORS.INCORRECT_PASSWORD.code,
      message: ERRORS.INCORRECT_PASSWORD.message.error_description,
    };
  }
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  await (await database()).collection('users').updateOne({ email: email }, { $set: { password: hashedNewPassword } });
  return { name: user.name, email, token: generateToken(email) };
};
