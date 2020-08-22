import { Request, Response } from 'express';
import { Document } from 'dynamoose/dist/Document';

import Payment from 'services/pagseguro';
import Transaction from 'models/Transaction';
import Client from 'models/Client';

class NotificationController {
  async store(req: Request, res: Response): Promise<Response> {
    const { notificationCode } = req.body;

    try {
      const response = await Payment.getTarnsactionFromNotification(
        notificationCode
      );
      if (response.status) {
        const {
          code,
          reference,
          status: transactionStatus,
          paymentLink,
          date,
          lastEventDate,
          grossAmount,
          feeAmount,
          paymentMethod,
          netAmount,
          extraAmount,
          installmentAmount,
          sender,
          shipping,
        } = response.response.transaction;

        if (reference !== '51-Vamos-a-China') {
          return res.status(422).send('UNKNOWN REFERENCE');
        }

        const query = await Client.query({
          email: response.response.transaction.sender.email,
        }).exec();

        if (!query.count || !query.length) {
          return res.status(401).send();
        }

        const document =
          !query.count || !query.length
            ? await Client.create({
                name: sender.name,
                email: sender.email,
                phone: `(${sender.phone.areaCode}) ${String(
                  sender.phone.number
                ).substr(0, 5)}-${String(sender.phone.number).substr(5)}`,
                cpf: sender.documents.document.value,
                transactions: [code],
                street: shipping.address.street,
                complement: shipping.address.complement,
                number: shipping.address.number,
                district: shipping.address.district,
                city: shipping.address.city,
                state: shipping.address.state,
                postalCode: `${String(shipping.address.postalCode).substr(
                  0,
                  5
                )}-${String(shipping.address.postalCode).substr(5)}`,
              })
            : // @ts-ignore
              // Type Error on dynamoose
              (query.pop() as Document);

        const client = document.toJSON();

        const transaction = await Transaction.query({ code }).exec();

        if (!transaction.count || !transaction.length) {
          await Transaction.create({
            code,
            client: client.id,
            reference: '51-Vamos-a-China',
            status: [
              'Aguardando',
              'Em análise',
              'Paga',
              'Disponível',
              'Em disputa',
              'Devolvida',
              'Cancelada',
            ][transactionStatus - 1],
            data: new Date(date),
            paymentMethod: paymentMethod === 1 ? 'creditCard' : 'bankTicket',
            paymentLink,
            grossAmount,
            feeAmount,
            netAmount,
            extraAmount,
            installmentAmount,
            history: [
              {
                status: [
                  'Aguardando',
                  'Em análise',
                  'Paga',
                  'Disponível',
                  'Em disputa',
                  'Devolvida',
                  'Cancelada',
                ][transactionStatus - 1],
                date: new Date(lastEventDate),
              },
            ],
          });
        } else {
          // @ts-ignore
          // Type Error on dynamoose
          const transactionJSON = (transaction.pop() as Document).toJSON();

          transactionJSON.status = [
            'Aguardando',
            'Em análise',
            'Paga',
            'Disponível',
            'Em disputa',
            'Devolvida',
            'Cancelada',
          ][transactionStatus - 1];
          transactionJSON.history.unshift({
            status: transactionJSON.status,
            date: new Date(lastEventDate),
          });
          const updated = new Transaction({ ...transactionJSON });

          await updated.save();
        }

        return res.status(200).send('OK');
      }
      throw new Error(response);
    } catch (error) {
      return res.status(500).json({ status: false, error });
    }
  }
}

export default new NotificationController();
