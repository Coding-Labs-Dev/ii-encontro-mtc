import { Router } from 'express';

import SessionController from 'controllers/SessionController';

const routes = Router();

routes.route('/sessions').post(SessionController.store);

export default routes;
