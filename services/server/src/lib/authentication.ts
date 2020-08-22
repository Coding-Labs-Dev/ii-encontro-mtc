import { Document } from 'dynamoose/dist/Document';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { APP_KEY } from 'config/constants';

import User from 'models/User';

export const getRefreshToken = async (document: Document) => {
  const json = document.toJSON();
  const refreshToken = jwt.sign(
    { sub: json.id, type: 'refreshToken' },
    APP_KEY,
    { algorithm: 'HS256' }
  );

  const { refreshTokens = [] } = json;

  refreshTokens.unshift(refreshToken);
  refreshTokens.splice(50);

  const updated = new User({ ...json, refreshTokens });

  await updated.save();

  return refreshToken;
};

export const generateAuthToken = async (
  document: Document,
  generateRefreshToken = true,
  expiresIn = 3600
) => {
  const user = document.toJSON();
  const { id } = user;
  const accessToken = jwt.sign({ sub: id, type: 'accessToken' }, APP_KEY, {
    algorithm: 'HS256',
    expiresIn,
  });

  const verificationToken = await bcrypt.hash(id, 10);

  if (generateRefreshToken) {
    const refreshToken = await getRefreshToken(document);
    return { accessToken, refreshToken, verificationToken };
  }
  return { accessToken, verificationToken };
};
