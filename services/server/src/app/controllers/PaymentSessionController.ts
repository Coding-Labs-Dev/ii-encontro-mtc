import { Request, Response } from 'express';
import Payment from 'services/pagseguro';

class SessionController {
  async store(_req: Request, res: Response) {
    try {
      const response = await Payment.getSession();
      if (response.session) {
        const { id } = response.session;
        return res.json({ status: true, token: id });
      }
      throw new Error(`Cant create payment session: ${response}`);
    } catch (error) {
      return res.status(500).json({ status: false, error });
    }
  }
}

export default new SessionController();
