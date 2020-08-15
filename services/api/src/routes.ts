import { Router } from 'express';

const routes = Router();

routes.route('/').get((_req, res) => res.send('Hello World'));

export default routes;
