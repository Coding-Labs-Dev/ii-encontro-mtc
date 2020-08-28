/* eslint-disable no-param-reassign */
import axios, { AxiosInstance } from 'axios';
import { getLocalStorageItem } from '~/utils/localStorage';

class Api {
  private static instance: AxiosInstance;

  private constructor() {
    return axios.create({
      baseURL: process.env.API_URL,
    });
  }

  public static injectToken(token: string) {
    Api.instance.interceptors.request.use(configuration => {
      configuration.headers.Authorization = `Bearer ${token}`;
      return configuration;
    });
  }

  public static getInstance(): AxiosInstance {
    if (!Api.instance) {
      Api.instance = new Api() as AxiosInstance;
    }
    const token = getLocalStorageItem('verificationToken');
    if (token) Api.injectToken(token);

    return Api.instance;
  }
}

export default Api.getInstance();

export const { injectToken } = Api;
