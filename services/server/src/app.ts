import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import serverless from 'serverless-http';
import morganBody from 'morgan-body';
import Rollbar from 'rollbar';

import { ROLLBAR_KEY } from 'config/constants';

import routes from './routes';
import HttpExceptionHandler from 'middlewares/HttpExceptionMiddleware';
import AuthenticationMiddleware from 'middlewares/AuthenticationMiddleware';

const whiteList = [/localhost/, /\.sbcmtc\.com\.br$/];

class App {
  public server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.globalEHandler();
  }

  middlewares(): void {
    this.server.use(
      cors({
        credentials: true,
        origin(origin, callback) {
          if (whiteList.findIndex(value => value.test(origin || '')) !== -1) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
      })
    );
    this.server.use(cookieParser());
    this.server.use(express.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use('/admin', AuthenticationMiddleware);
    if (process.env.NODE_ENV !== 'test') {
      morganBody(this.server, {
        maxBodyLength: 4000,
      });
    }
  }

  routes(): void {
    this.server.use(routes);
  }

  globalEHandler(): void {
    if (process.env.NODE_ENV === 'production') {
      const rollbar = new Rollbar({
        accessToken: ROLLBAR_KEY,
        captureUncaught: true,
        captureUnhandledRejections: true,
      });
      this.server.use(rollbar.errorHandler());
    }
    this.server.use(HttpExceptionHandler);
  }
}

export const { server } = new App();

export default serverless(server, { binary: ['image/*', 'video/*'] });
