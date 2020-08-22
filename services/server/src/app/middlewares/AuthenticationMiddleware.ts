// @ts-nocheck
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { COOKIE_OPTIONS, APP_KEY } from 'config/constants';
import { Request, Response, NextFunction } from 'express';

const AuthenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies || !req.cookies.accessToken || !req.headers.authorization) {
    return res.status(401).json({ msg: 'Access denied. No token provided.' });
  }
  // get the token from the header if present
  const token = req.cookies.accessToken;
  const verificationToken = req.headers.authorization.split(' ')[1];

  try {
    // if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, APP_KEY, {
      algorithms: ['HS256'],
    }) as { sub: string };

    return bcrypt.compare(decoded.sub, verificationToken, (err, result) => {
      if (err) {
        return res.status(500).json({ isAuth: false, msg: err });
      }
      if (result) {
        req.user = {
          id: decoded.sub,
        };

        return next();
      }
      return res
        .status(401)
        .clearCookie('accessToken', { ...COOKIE_OPTIONS, maxAge: null })
        .clearCookie('refreshToken', { ...COOKIE_OPTIONS, maxAge: null })
        .json({ msg: 'Invalid token' });
    });
  } catch (err) {
    console.log(err);
    // if invalid token
    return res.status(401).json({ msg: err.message });
  }
};

export default AuthenticationMiddleware;
