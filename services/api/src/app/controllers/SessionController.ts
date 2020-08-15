import { Request, Response } from 'express';

import Admin from 'models/Admin';

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await Admin.getAdmin(email);
    if (!user) return res.status(404).send();

    const auth = await user.authenticate(password);

    if (!auth) return res.status(401).send();

    return res.json({ ...auth });
  }
}

export default new SessionController();
