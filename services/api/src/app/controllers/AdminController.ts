import { Request, Response } from 'express';

import Admin from 'models/Admin';

class AdminController {
  async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const exists = await Admin.getAdmin(email);
    if (exists)
      return res
        .status(400)
        .json({ error: { message: 'User with this e-mail already exists' } });

    const user = await Admin.createAdmin({ email, password });
    return res.json(user);
  }
}

export default new AdminController();
