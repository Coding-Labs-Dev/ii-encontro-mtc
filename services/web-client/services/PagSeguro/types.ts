declare global {
  interface Window {
    PagSeguroDirectPayment: PagSeguroDirectPayment;
  }
}

/**
 * PagSeguroDirectPayment
 */

export interface GenericError {
  error: true;
  message: string;
}

export interface GenericMethod {
  success: (response: any) => void;
  error: (error: GenericError) => void;
  complete?: (response: any) => void;
}

export interface PaymentMethodData {
  name: string;
  displayName: string;
  status: string;
  code: number;
  images: {
    SMALL: {
      size: 'small';
      path: string;
    };
    MEDIUM: {
      size: 'medium';
      path: string;
    };
  };
}

export interface Installment {
  quantity: number;
  installmentAmount: number;
  totalAmount: number;
  interestFree: boolean;
}

export interface GetPaymentMethodsResponse {
  error: false;
  paymentMethods: {
    [key: string]: Installment;
  };
}

export interface GetPaymentMethodsParams extends GenericMethod {
  amount?: number;
  success: (response: GetPaymentMethodsResponse) => void;
}

export interface OnSenderHashReadyResponse {
  status: string;
  message: string;
  senderHash: string;
}

export type OnSenderHashReady = (response: OnSenderHashReadyResponse) => void;

export type GetPaymentMethods = (params: GetPaymentMethodsParams) => void;

export interface CardBrandData {
  name: string;
  bin: number;
  cvvSize: number;
  expirable: 'y' | 'n';
  validationAlgorithm: string;
}

export interface GetBrandResponse {
  error: false;
  brand: CardBrandData;
}

export interface GetBrandParams extends GenericMethod {
  cardBin: string;
  success: (response: GetBrandResponse) => void;
}

export interface GetInstallmentsResponse {
  error: false;
  installments: {
    [key: string]: Array<Installment>;
  };
}

export interface GetInstallmentsParams extends GenericMethod {
  amount: number;
  maxInstallmentNoInterest?: number;
  brand?: string;
  success: (response: GetInstallmentsResponse) => void;
}

export interface CreateCardTokenResponse {
  error: false;
  card: {
    token: string;
  };
}

export interface CreateCardTokenParams extends GenericMethod {
  cardNumber: string;
  brand: string;
  cvv: string;
  expirationMonth: string;
  expirationYear: string;
  success: (response: CreateCardTokenResponse) => void;
}

export interface PagSeguroDirectPayment {
  setSessionId(token: string): Promise<void>;
  getPaymentMethods: GetPaymentMethods;
  onSenderHashReady(callback: OnSenderHashReady): void;
  getBrand(callback: GetBrandParams): void;
  getInstallments(callback: GetInstallmentsParams): void;
  createCardToken(callback: CreateCardTokenParams): void;
}

/**
 * usePagSeguroDirectPayment
 */

export interface UsePagSeguroDirectPaymentProps {
  production?: boolean;
  id?: string;
}

export type UsePagSeguroDirectPayment = (
  props?: UsePagSeguroDirectPaymentProps
) => boolean;

/**
 * PagSeguroClient
 */

export interface IPagSecuroClass {
  createSession(token: string): Promise<void>;

  getPaymentMethods(
    amount?: number
  ): Promise<GetPaymentMethodsResponse | GenericError>;

  getSenderHash(): Promise<string>;

  getCreditCardBrand(bin: string): Promise<GetBrandResponse | GenericError>;

  getInstallments(props: {
    amount: number;
    maxInstallmentNoInterest?: number;
    brand?: string;
  }): Promise<GetInstallmentsResponse | GenericError>;

  getCreditCardToken(props: {
    cardNumber: string;
    brand: string;
    cvv: string;
    expirationMonth: string;
    expirationYear: string;
  }): Promise<CreateCardTokenResponse | GenericError>;
}
