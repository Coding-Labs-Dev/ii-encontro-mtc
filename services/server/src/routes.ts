import { Router } from 'express';

import { wrapper } from 'middlewares/HttpExceptionMiddleware';

import ClientController from 'controllers/ClientController';
import NotificationController from 'controllers/NotificationController';
import PaymentSessionController from 'controllers/PaymentSessionController';
import SessionController from 'controllers/SessionController';
import TransactionController from 'controllers/TransactionController';

const routes = Router();

routes.get('/payment', wrapper(PaymentSessionController.store));
routes.post('/payment', wrapper(TransactionController.store));

routes.post('/notification', wrapper(NotificationController.store));

routes
  .route('/sessions')
  .post(wrapper(SessionController.store))
  .put(wrapper(SessionController.update))
  .get(wrapper(SessionController.show));

routes.get('/admin/clients', wrapper(ClientController.index));
routes.get('/admin/clients/:id', wrapper(ClientController.show));

routes.get('/admin/transactions', TransactionController.index);
routes.get('/admin/transactions/:id', TransactionController.show);

export default routes;
