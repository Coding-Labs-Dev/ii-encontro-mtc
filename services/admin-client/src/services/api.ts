/* eslint-disable no-param-reassign */
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API,
});

export function injectToken(token: string) {
  axios.interceptors.request.use(configuration => {
    configuration.headers.Authorization = `Bearer ${token}`;
    return configuration;
  });
}

export default api;
