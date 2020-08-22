import { Request, Response } from 'express';

import Client from 'models/Client';

class ClientController {
  async index(_req: Request, res: Response): Promise<Response> {
    const clients = await Client.scan().exec();
    return res.json({ clients });
  }
  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const client = await Client.get({ id });
    if (!client) {
      return res.status(404).json({ msg: 'Client not found' });
    }
    return res.json({ client });
  }
}

export default new ClientController();
