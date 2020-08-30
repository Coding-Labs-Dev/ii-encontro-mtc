import axios, { AxiosInstance } from 'axios';
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  saveLocalStorageItem,
} from '~/utils/localStorage';

class Api {
  private static instance: AxiosInstance;

  private constructor() {
    return axios.create({
      baseURL: process.env.API_URL,
    });
  }

  public static injectToken(token: string) {
    Api.instance.interceptors.request.use(configuration => ({
      ...configuration,
      headers: {
        ...configuration.headers,
        Authorization: `Bearer ${token}`,
      },
    }));
  }

  private static renewSession() {
    Api.instance.interceptors.response.use(
      response => response,
      async error => {
        if (!error.response) throw error;
        const {
          config,
          response: { status },
        } = error;
        if (
          status === 401 &&
          config.url === '/sessions' &&
          config.method === 'put'
        ) {
          removeLocalStorageItem('verificationToken');
          throw new Error('Sessão Expirada');
        }
        if (status === 401 && config.url !== '/sessions' && !config.retry) {
          const response = await Api.instance.put('/sessions', null, {
            withCredentials: true,
          });
          const { verificationToken } = response.data;
          saveLocalStorageItem('verificationToken', verificationToken);
          Api.injectToken(verificationToken);
          config.headers.Authorization = `Bearer ${verificationToken}`;
          config.retry = true;
          return Api.instance(config);
        }
        throw error;
      }
    );
  }

  public static removeToken() {
    Api.instance.interceptors.request.use(configuration => ({
      ...configuration,
      headers: {
        ...configuration.headers,
        Authorization: null,
      },
    }));
  }

  public static getInstance(): AxiosInstance {
    if (!Api.instance) {
      Api.instance = new Api() as AxiosInstance;
      Api.renewSession();
      const token = getLocalStorageItem('verificationToken');
      if (token) Api.injectToken(token);
    }

    return Api.instance;
  }
}

export default Api.getInstance();

export const { injectToken } = Api;
export const { removeToken } = Api;

export const parseError = (error: any) => {
  const { response } = error;
  if (!response) return error;
  throw new Error(response.data);
};
