import { useState, useEffect } from 'react';

import {
  UsePagSeguroDirectPayment,
  PagSeguroDirectPayment,
  IPagSecuroClass,
  GetPaymentMethodsResponse,
  GenericError,
  GetBrandResponse,
  GetInstallmentsResponse,
  CreateCardTokenResponse,
} from './types';

export const usePagSeguroDirectPayment: UsePagSeguroDirectPayment = (
  props = {}
) => {
  const isSSR = typeof window === 'undefined';
  const {
    production = process.env.NODE_ENV === 'production',
    id = 'pagseguro-direct-payment-script',
  } = props;
  const url = production
    ? 'https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js'
    : 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js';

  const [script, setScript] = useState(
    !isSSR ? document.querySelector(`#${id}`) : undefined
  );

  const [isReady, setIsReady] = useState(
    !!script || (!isSSR && !!window.PagSeguroDirectPayment)
  );

  useEffect(() => {
    if (!isSSR) {
      if (!script && !window.PagSeguroDirectPayment) {
        const scriptTag = document.createElement('script');
        scriptTag.id = id;
        scriptTag.src = url;
        scriptTag.async = true;
        scriptTag.onload = () => {
          setIsReady(true);
        };
        document.body.appendChild(scriptTag);
        setScript(scriptTag);
      }
    }
  });

  return isReady;
};

class PagSeguroClient implements IPagSecuroClass {
  private static instance: PagSeguroDirectPayment;

  constructor() {
    if (!window.PagSeguroDirectPayment)
      throw Error('PagSecuroDirectPayment is undefined');
    PagSeguroClient.instance = window.PagSeguroDirectPayment;
  }
  public async createSession(token: string): Promise<void> {
    try {
      await PagSeguroClient.instance.setSessionId(token);
    } catch (error) {
      console.error(error);
    }
  }

  async getPaymentMethods(
    amount?: number
  ): Promise<GetPaymentMethodsResponse | GenericError> {
    return new Promise((resolve, reject) => {
      PagSeguroClient.instance.getPaymentMethods({
        amount,
        success: (result) => resolve(result),
        error: (error) => reject(error),
      });
    });
  }

  async getSenderHash(): Promise<string> {
    return new Promise((resolve, reject) => {
      PagSeguroClient.instance.onSenderHashReady((response) => {
        if (response.status === 'error') reject(response.message);
        resolve(response.senderHash);
      });
    });
  }

  async getCreditCardBrand(
    bin: string
  ): Promise<GetBrandResponse | GenericError> {
    return new Promise((resolve, reject) => {
      PagSeguroClient.instance.getBrand({
        cardBin: bin,
        success: (result) => resolve(result),
        error: (error) => reject(error),
      });
    });
  }

  async getInstallments({
    amount,
    maxInstallmentNoInterest,
    brand,
  }: {
    amount: number;
    maxInstallmentNoInterest?: number;
    brand?: string;
  }): Promise<GetInstallmentsResponse | GenericError> {
    return new Promise((resolve, reject) => {
      PagSeguroClient.instance.getInstallments({
        amount,
        maxInstallmentNoInterest,
        brand,
        success: (result) => resolve(result),
        error: (error) => reject(error),
      });
    });
  }

  async getCreditCardToken({
    cardNumber,
    brand,
    cvv,
    expirationMonth,
    expirationYear,
  }: {
    cardNumber: string;
    brand: string;
    cvv: string;
    expirationMonth: string;
    expirationYear: string;
  }): Promise<CreateCardTokenResponse | GenericError> {
    return new Promise((resolve, reject) => {
      PagSeguroClient.instance.createCardToken({
        cardNumber,
        brand,
        cvv,
        expirationMonth,
        expirationYear,
        success: (result) => resolve(result),
        error: (error) => reject(error),
      });
    });
  }
}

export default PagSeguroClient;
