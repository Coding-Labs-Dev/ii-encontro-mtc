import { Router } from 'express';

import { wrapper } from 'middlewares/HttpExceptionMiddleware';

import SessionController from 'controllers/SessionController';
import ClientController from 'controllers/ClientController';

const routes = Router();

routes
  .route('/sessions')
  .post(wrapper(SessionController.store))
  .put(wrapper(SessionController.update))
  .get(wrapper(SessionController.show));

routes.get('/admin/clients', wrapper(ClientController.index));
routes.get('/admin/clients/:id', wrapper(ClientController.show));

export default routes;
