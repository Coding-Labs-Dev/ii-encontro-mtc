import { Router } from 'express';

import SessionController from 'controllers/SessionController';

const routes = Router();

routes.route('/sessions').post(SessionController.store);
routes.route('/sessions').put(SessionController.update);

export default routes;
