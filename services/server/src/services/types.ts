/**
 * Package Types
 */

export interface ResponseError {
  error: {
    message: string;
    config?: object;
    response?: object;
    error?: object;
  };
}

/**
 * PagSeguro Requests Bodies
 */

export interface Sender {
  hash: string;
  name: string;
  email: string;
  phone: {
    areaCode: string;
    number: string;
  };
  documents: {
    document: {
      type: 'CPF' | 'CNPJ';
      value: string;
    };
  };
}

export interface Item {
  id: string;
  description: string;
  quantity: string;
  amount: string;
}

export interface ShippingAddress {
  street: string;
  number: number;
  complement: string;
  district: string;
  city: string;
  state: string;
  country: 'BRL';
  postalCode: string;
}

export interface Holder {
  name: string;
  documents: {
    document: {
      type: 'CPF' | 'CNPJ';
      value: string;
    };
  };
  birthDate: string;
  phone: {
    areaCode: string;
    number: string;
  };
}

export interface BillingAddress {
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  complement: string;
}

export interface Installment {
  quantity: number;
  value: string;
  noInterestInstallmentQuantity?: number;
}

export interface CreditCard {
  token: string;
  installment: Installment;
  holder: Holder;
  billingAddress: BillingAddress;
}

export interface GenericCheckout {
  reference?: string;
  sender: Sender;
  items: Array<{ item: Item }>;
  shipping: {
    addressRequired: boolean;
    address?: ShippingAddress;
    type?: 1 | 2 | 3;
    cost?: string;
  };
  extraAmount?: string;
  notificationURL?: string;
}

export type GetPaymentPayloadCreditCard = GenericCheckout & {
  method: 'creditCard';
  creditCard: CreditCard;
};

export type GetPaymentPayloadBoleto = GenericCheckout & {
  method: 'boleto';
};

export type GetPaymentPayloadData =
  | GetPaymentPayloadCreditCard
  | GetPaymentPayloadBoleto;

export interface MakePayment {
  data: GetPaymentPayloadData;
  print?: boolean;
  dryRun?: boolean;
}

/**
 * Commom Body
 */

export interface DefaultCheckoutBody {
  payment: {
    mode: 'default';
    currency: 'BRL';
    reference?: string;
    receiver: {
      email: string;
    };
    sender: Sender;
    items: Array<{ item: Item }>;
    shipping: {
      addressRequired: boolean;
      address?: ShippingAddress;
      type?: 1 | 2 | 3;
      cost?: string;
    };
    extraAmount?: string;
    notificationURL?: string;
  };
}

export type BoletoCheckout = DefaultCheckoutBody & {
  payment: {
    method: 'boleto';
  };
};

export type CreditCardCheckout = DefaultCheckoutBody & {
  payment: {
    method: 'creditCard';
    creditCard: CreditCard;
  };
};

export type Checkout = BoletoCheckout | CreditCardCheckout;

/**
 * PagSeguro Responses
 */

export interface CreateSession {
  session: {
    id: string;
  };
}
