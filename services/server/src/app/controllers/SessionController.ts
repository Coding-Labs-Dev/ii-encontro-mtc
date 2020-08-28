import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { COOKIE_OPTIONS, APP_KEY } from 'config/constants';
import User from 'models/User';

import { generateAuthToken } from 'lib/authentication';
import { Document } from 'dynamoose/dist/Document';

class SessionController {
  async show(req: Request, res: Response): Promise<Response> {
    if (!req.cookies || !req.cookies.accessToken) {
      return res.status(401).json({ msg: 'Access denied. No token provided.' });
    }

    if (!req.headers.authorization) {
      return res
        .status(401)
        .clearCookie('accessToken', { ...COOKIE_OPTIONS, maxAge: null })
        .clearCookie('refreshToken', { ...COOKIE_OPTIONS, maxAge: null })
        .json({ msg: 'Invalid header token' });
    }
    const { accessToken } = req.cookies;
    const verificationToken = req.headers.authorization.split(' ')[1];

    try {
      console.log(req.headers);
      if (!verificationToken)
        return res
          .status(401)
          .clearCookie('accessToken', { ...COOKIE_OPTIONS, maxAge: null })
          .clearCookie('refreshToken', { ...COOKIE_OPTIONS, maxAge: null })
          .json({ msg: 'No verification token' });

      const decoded = jwt.verify(accessToken, APP_KEY, {
        algorithms: ['HS256'],
      }) as { sub: string };
      if (!decoded) {
        return res.status(400).json({ msg: 'Invalid token' });
      }

      const auth = bcrypt.compareSync(decoded.sub, verificationToken);
      if (!auth)
        return res
          .status(401)
          .clearCookie('accessToken', { ...COOKIE_OPTIONS, maxAge: null })
          .clearCookie('refreshToken', { ...COOKIE_OPTIONS, maxAge: null })
          .json({ msg: 'Invalid bearer token' });

      return res.status(200).json({ isAuth: true });
    } catch (err) {
      return res.status(401).json({ msg: err.message });
    }
  }

  async store(req: Request, res: Response): Promise<Response> {
    const {
      body: { email, password, saveSession },
    } = req;

    if (!email || !password)
      return res.status(400).send('Email e senha são obrigatórios');

    const query = await User.query({ email }).exec();

    if (!query.count || !query.length) {
      return res.status(401).send('Email ou senha inválidos');
    }

    // @ts-ignore
    // Type Error on dynamoose
    const document = query.pop() as Document;

    const user = document.toJSON();

    const auth = bcrypt.compareSync(password, user.password);
    if (!auth) return res.status(401).send('Email ou senha inválidos');

    const {
      accessToken,
      refreshToken,
      verificationToken,
    } = await generateAuthToken(document);

    const authOptions = { ...COOKIE_OPTIONS };
    const refreshOptions = {
      ...COOKIE_OPTIONS,
      maxAge: 1 * 365 * 24 * 60 * 60 * 1000,
    };

    if (!saveSession) {
      delete authOptions.maxAge;
      delete refreshOptions.maxAge;
    }

    return res
      .status(201)
      .cookie('accessToken', accessToken, authOptions)
      .cookie('refreshToken', refreshToken, refreshOptions)
      .json({
        isAuth: true,
        verificationToken,
      });
  }
  async update(req: Request, res: Response): Promise<Response> {
    if (!req.cookies || !req.cookies.refreshToken) {
      return res
        .status(401)
        .json({ msg: 'Access denied. No refresh token provided.' });
    }
    // get the token from the header if present
    const { refreshToken } = req.cookies;

    try {
      // if can verify the token, set req.user and pass to next middleware
      const decoded = jwt.verify(refreshToken, APP_KEY, {
        algorithms: ['HS256'],
      });
      if (!decoded) {
        return res.status(400).json({ msg: 'Invalid token' });
      }

      const { sub: id } = decoded as { sub: string };

      const user = await User.get({ id });

      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }

      const { refreshTokens } = user.toJSON();
      if (!refreshTokens || !refreshTokens.includes(refreshToken)) {
        return res.status(401).json({ msg: 'No valid refresh tokens found' });
      }

      const { accessToken, verificationToken } = await generateAuthToken(user);
      return res
        .status(201)
        .cookie('accessToken', accessToken, COOKIE_OPTIONS)
        .json({
          isAuth: true,
          verificationToken,
        });
    } catch (err) {
      // if invalid token
      return res.status(401).json({ msg: err.message });
    }
  }
}

export default new SessionController();
