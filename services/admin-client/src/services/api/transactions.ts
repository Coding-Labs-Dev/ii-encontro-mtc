import api, { parseError } from 'services/api';
import { Transaction } from '~/store/Transactions/types';

export const getTransactions = (): Promise<Array<Transaction>> =>
  api
    .get('/admin/transactions', {
      withCredentials: true,
    })
    .then(response => response.data.transactions)
    .catch(parseError);
