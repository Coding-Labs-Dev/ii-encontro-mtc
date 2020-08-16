import { Request, Response } from 'express';

import Admin from 'models/Admin';

class AdminController {
  async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const exists = await Admin.adminExists();
    if (exists)
      return res
        .status(400)
        .json({ error: { message: 'Admin already exists' } });

    const admin = await Admin.createAdmin({ email, password });

    if (!admin) return res.status(500);

    const adminJSON = admin?.toJSON();
    delete adminJSON?.hashedPassword;
    return res.json(adminJSON);
  }
}

export default new AdminController();
