import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import serverless from 'serverless-http';
import morganBody from 'morgan-body';
import routes from './routes';
// import HttpExceptionHandler from './app/middlewares/HttpExceptionMiddleware';

class App {
  public server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    // this.globalEHandler();
  }

  middlewares(): void {
    this.server.use(cors());
    this.server.use(bodyParser.json());
    morganBody(this.server, {
      maxBodyLength: 4000,
    });
  }

  routes(): void {
    this.server.use(routes);
  }

  // globalEHandler(): void {
  //   this.server.use(HttpExceptionHandler);
  // }
}

export const { server } = new App();

export default serverless(server, { binary: ['image/*', 'video/*'] });
