import { Request, Response } from 'express';
import Payment from 'services/pagseguro';

class SessionController {
  async store(_req: Request, res: Response) {
    try {
      const response = await Payment.getSession();
      if (response.status) {
        const { id } = response.response.session;
        return res.json({ status: true, id });
      }
      throw new Error(response);
    } catch (error) {
      return res.status(500).json({ status: false, error });
    }
  }
}

export default new SessionController();
