import { FormData } from '~/app/controllers/TransactionController';
import { GetPaymentPayloadData, Item } from '~/services/types';

export const parseFormData = (data: FormData): GetPaymentPayloadData => {
  const items: Array<{ item: Item }> = [
    {
      item: {
        ...data.items.item,
        amount: data.items.item.amount.toFixed(2),
      },
    },
  ];
  return {
    method: 'creditCard',
    creditCard: {
      token: data.creditCard.token,
      installment: {
        quantity: data.creditCard.installment.quantity,
        value: data.creditCard.installment.value.toFixed(2),
      },
      holder: data.other.billingSameAsShipping
        ? data.sender
        : data.creditCard.holder,
      billingAddress: data.other.billingSameAsShipping
        ? { ...data.shipping, country: 'BRA' }
        : { ...data.billingAddress, country: 'BRA' },
    },
    reference: data.reference,
    sender: data.sender,
    items,
    shipping: {
      addressRequired: false,
    },
    extraAmount: '0.00',
    notificationURL: process.env.PAGSEGURO_NOTIFICATION,
  };
};
