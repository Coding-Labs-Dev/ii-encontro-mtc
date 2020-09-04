// import request from 'request-promise-native';
import parser from 'fast-xml-parser';
import { toXML } from 'jstoxml';
import axios, { AxiosInstance } from 'axios';
import errorCodes from './errorCodes';

import { Checkout, GetPaymentPayloadData, MakePayment } from './types';

interface Constructor {
  email: string;
  token: string;
  sandbox?: boolean;
  sandboxEmail?: string;
}

class PagSeguro {
  private static credentials: {
    email: string;
    token: string;
  };
  private static isSandbox: boolean;
  private static sandboxEmail: string;
  private static url: string;
  private static api: AxiosInstance;

  constructor({ email, token, sandbox = false, sandboxEmail }: Constructor) {
    PagSeguro.credentials = { email, token };
    PagSeguro.isSandbox = sandbox;
    if (sandbox && sandboxEmail) PagSeguro.sandboxEmail = sandboxEmail;
    PagSeguro.url = PagSeguro.isSandbox
      ? 'https://ws.sandbox.pagseguro.uol.com.br/v2'
      : 'https://ws.pagseguro.uol.com.br/v2';
    PagSeguro.api = axios.create({
      baseURL: PagSeguro.url,
    });
  }

  private handleError(e: any) {
    if (!e.response) throw new Error(e);
    const { response } = e;
    const { statusText, headers } = response;
    if (
      headers['content-type'] &&
      headers['content-type'].includes('text/plain')
    )
      return {
        status: false,
        message: statusText,
      };

    const error = parser.parse(e.response.data);
    const errors = error.errors.error;
    if (!Array.isArray(errors)) {
      const { code, message } = errors;
      return {
        status: false,
        message: errorCodes[code],
        error: { code, message },
      };
    }
    return {
      status: false,
      messages: errors.map(({ code }) => errorCodes[code]),
      errors: errors.map(({ code, message }) => ({ code, message })),
    };
  }

  public getSandboxEmail() {
    return PagSeguro.sandboxEmail;
  }

  private static getPaymentPayload(data: GetPaymentPayloadData): Checkout {
    if (data.method === 'creditCard') {
      return {
        payment: {
          mode: 'default',
          currency: 'BRL',
          receiver: {
            email: PagSeguro.credentials.email,
          },
          ...data,
          sender: {
            ...data.sender,
            email: PagSeguro.isSandbox
              ? PagSeguro.sandboxEmail
              : data.sender.email,
          },
        },
      };
    }
    return {
      payment: {
        mode: 'default',
        currency: 'BRL',
        receiver: {
          email: PagSeguro.credentials.email,
        },
        ...data,
      },
    };
  }

  public async makePayment({
    data,
    print = false,
    dryRun = false,
  }: MakePayment): Promise<any> {
    const payload = PagSeguro.getPaymentPayload(data);
    if (print) console.dir(payload, { depth: 5 });
    if (dryRun)
      return new Promise(resolve =>
        resolve({ status: true, response: payload })
      );
    try {
      const xml = toXML(payload);
      const response = await PagSeguro.api.post('/transactions', xml, {
        headers: {
          'Content-Type': 'application/xml; charset=ISO-8859-1',
        },
        params: {
          email: PagSeguro.credentials.email,
          token: PagSeguro.credentials.token,
        },
      });
      return parser.parse(response.data);
    } catch (e) {
      return this.handleError(e);
    }
  }

  public async getTransactionFromNotification(
    notificationCode: string
  ): Promise<any> {
    try {
      const response = await PagSeguro.api.get(
        `/transactions/notifications/${notificationCode}`
      );
      return parser.parse(response.data);
    } catch (e) {
      const error = parser.parse(e.error);
      const errors = error.errors.error;
      if (!Array.isArray(errors)) {
        const { code, message } = errors;
        return {
          status: false,
          message: errorCodes[code],
          error: { code, message },
        };
      }
      return {
        status: false,
        messages: errors.map(({ code }) => errorCodes[code]),
        errors: errors.map(({ code, message }) => ({ code, message })),
      };
    }
  }

  public async getSession() {
    try {
      const response = await PagSeguro.api.post('/sessions', undefined, {
        params: {
          email: PagSeguro.credentials.email,
          token: PagSeguro.credentials.token,
        },
      });
      return parser.parse(response.data);
    } catch (e) {
      console.log(e);
      const error = parser.parse(e.error);
      const errors = error.errors.error;
      if (!Array.isArray(errors)) {
        const { code, message } = errors;
        return {
          status: false,
          message: errorCodes[code],
          error: { code, message },
        };
      }
      return {
        status: false,
        messages: errors.map(({ code }) => errorCodes[code]),
        errors: errors.map(({ code, message }) => ({ code, message })),
      };
    }
  }
}

export default PagSeguro;
