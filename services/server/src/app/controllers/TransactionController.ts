import { Request, Response } from 'express';
import { ulid } from 'ulid';

import Payment from 'services/pagseguro';

import Client from 'models/Client';
import Transaction from 'models/Transaction';
import { Document } from 'dynamoose/dist/Document';
import { parseFormData } from '~/lib/parseFormData';

export interface FormData {
  reference: string;
  items: {
    item: {
      id: string;
      description: string;
      amount: number;
      quantity: string;
    };
  };
  other: {
    location: string;
    referer: string;
    billingSameAsShipping: boolean;
    paymentTotal: number;
  };
  sender: {
    hash: string;
    name: string;
    documents: { document: { type: 'CPF'; value: string } };
    email: string;
    phone: { areaCode: string; number: string };
    birthDate: string;
  };
  shipping: {
    street: string;
    complement: string;
    number: string;
    district: string;
    city: string;
    state: string;
    postalCode: string;
  };
  creditCard: {
    token: string;
    holder: {
      name: string;
      documents: { document: { type: 'CPF'; value: string } };
      phone: { areaCode: string; number: string };
      birthDate: string;
    };
    installment: {
      quantity: number;
      value: number;
    };
  };
  billingAddress: {
    street: string;
    complement: string;
    number: string;
    district: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

class TransactionController {
  async index(_req: Request, res: Response) {
    const transactions = await Transaction.scan().exec();
    return res.status(200).json({ transactions });
  }

  async store(req: Request, res: Response) {
    try {
      const body = req.body as FormData;
      const { sender, shipping } = body;

      const rawDOB = sender.birthDate.split('/');
      const dob = new Date(
        Number(rawDOB[2]),
        Number(rawDOB[1]) - 1,
        Number(rawDOB[0])
      );

      const clientExists = await Client.query({
        email: sender.email,
      }).exec();

      const userId = ulid();

      const client: Document = clientExists.count
        ? // @ts-ignore
          clientExists!.pop()!.toJSON()
        : await Client.create({
            id: userId,
            name: sender.name,
            email: sender.email,
            phone: `${sender.phone.areaCode}${sender.phone.number}`,
            referer: body.other.referer,
            location: body.other.location,
            cpf: sender.documents.document.value,
            dob,
            street: shipping.street,
            complement: shipping.complement,
            number: shipping.number,
            district: shipping.district,
            city: shipping.city,
            state: shipping.state,
            postalCode: shipping.postalCode,
          });

      const paymentData = parseFormData(body);
      const response = await Payment.makePayment({
        data: paymentData,
        print: true,
      });

      if (!response.transaction) throw response;

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
      } = response.transaction;
      const clientJSON = clientExists.count ? client : client.toJSON();

      const { transactions = [] } = clientJSON;
      transactions.push(code);

      await Client.update({
        id: clientJSON.id,
        transactions,
      });

      await Transaction.create({
        code,
        client: clientJSON.id,
        location: body.other.location,
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
        date: new Date(date),
        paymentMethod: 'creditCard',
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
