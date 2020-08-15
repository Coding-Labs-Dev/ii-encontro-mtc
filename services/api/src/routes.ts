import { Router } from 'express';

import { wrapper } from 'middlewares/HttpExceptionMiddleware';

import SessionController from 'controllers/SessionController';

const routes = Router();

routes
  .route('/sessions')
  .post(wrapper(SessionController.store))
  .put(wrapper(SessionController.update));

export default routes;
