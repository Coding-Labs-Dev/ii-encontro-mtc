import { Request, Response } from 'express';
import Payment from 'services/pagseguro';

import Client from 'models/Client';
import Transaction from 'models/Transaction';
import { Document } from 'dynamoose/dist/Document';

class TransactionController {
  async index(_req: Request, res: Response) {
    const transactions = await Transaction.scan().exec();
    return res.status(200).json({ transactions });
  }

  async store(req: Request, res: Response) {
    try {
      const {
        body: {
          cart,
          location,
          referer,
          sender,
          shipping,
          billing,
          paymentMethod,
          creditCard,
          creditCardHolder,
        },
      } = req;

      const payment = {
        method: paymentMethod,
      };

      if (paymentMethod === 'creditCard') {
        // @ts-ignore
        payment.params = [
          { card: creditCard },
          { ...creditCardHolder },
          { ...billing, sameAsShipping: creditCardHolder.sameAsBuyer },
          {
            installmentQuantity: cart.creditCard
              ? cart.creditCard.quantity
              : null,
            installmentValue: cart.creditCard
              ? cart.creditCard.installmentAmount
              : null,
            // noInterestInstallmentQuantity: cart.creditCard
            //   ? cart.maxInstallmentNoInterest
            //   : null,
          },
        ];
      }

      Payment.setCheckoutData(sender, shipping, cart.items, payment);
      const options = {
        reference: 'II Encontro MTC',
        notificationURL: process.env.NOTIFICATION_URL,
      };

      const rawDOB = sender.senderBirthDate.split('/');
      const dob = new Date(Number(rawDOB[2]), Number(rawDOB[1]) - 1, rawDOB[0]);

      const clientExists = await Client.query({
        email: sender.senderEmail,
      }).exec();

      const client: Document = clientExists.count
        ? // @ts-ignore
          clientExists!.pop()!.toJSON()
        : await Client.create({
            name: sender.senderName,
            email: sender.senderEmail,
            phone: sender.senderFullPhone,
            referer,
            location,
            cpf: sender.senderCPF,
            dob,
            street: shipping.shippingAddressStreet,
            complement: shipping.shippingAddressComplement,
            number: shipping.shippingAddressNumber,
            district: shipping.shippingAddressDistrict,
            city: shipping.shippingAddressCity,
            state: shipping.shippingAddressState,
            postalCode: shipping.shippingAddressPostalCode,
          });

      const response = await Payment.makePayment(options);
      if (response.status) {
        const {
          code,
          status: transactionStatus,
          paymentLink,
          date,
          grossAmount,
          feeAmount,
          netAmount,
          extraAmount,
          installmentAmount,
        } = response.response.transaction;
        const clientJSON = clientExists.count ? client : client.toJSON();
        const { transactions = [] } = clientJSON;
        transactions.push(code);
        await Client.create({ ...clientJSON, transactions });

        await Transaction.create({
          code,
          client: clientJSON.id,
          location,
          reference: 'II-Econtro-MTC',
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
          paymentMethod,
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
              date: new Date(date),
            },
          ],
        });

        return res.json({
          status: true,
          transactionStatus,
          paymentLink,
        });
      }
      throw response;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, error });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const transaction = await Transaction.get({ id });
    if (!transaction) {
      return res.status(404).json({ msg: `Transaction doesn't exists` });
    }
    return res.status(200).json({ transaction });
  }
}

export default new TransactionController();
