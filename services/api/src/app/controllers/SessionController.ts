import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { APP_KEY } from 'config/constants';
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

  async update(req: Request, res: Response): Promise<Response> {
    const { email, refreshToken } = req.body;
    const user = await Admin.getAdmin(email);
    if (!user) return res.status(401).send();

    try {
      const payload = jwt.verify(refreshToken, APP_KEY) as {
        email: string;
      };
      if (payload.email !== email) return res.status(401).send();
      return res.json({ ...user.createTokens(false) });
    } catch (e) {
      return res.status(401).send();
    }
  }
}

export default new SessionController();
