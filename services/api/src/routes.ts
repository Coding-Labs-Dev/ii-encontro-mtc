import { Router } from 'express';

import { wrapper } from 'middlewares/HttpExceptionMiddleware';

import SessionController from 'controllers/SessionController';
import AdminController from 'controllers/AdminController';

const routes = Router();

routes
  .route('/sessions')
  .post(wrapper(SessionController.store))
  .put(wrapper(SessionController.update));

routes.route('/admins').post(wrapper(AdminController.store));

export default routes;
