import { FetchStatus } from 'store/util/fetchStatus';
import { List } from 'immutable';

export interface Transaction {
  id: string;
  code: string;
  client: string;
  location: string;
  reference: string;
  status: string;
  data: string;
  paymentMethod: string;
  paymentLink: string;
  grossAmount: Number;
  feeAmount: Number;
  netAmount: Number;
  extraAmount: Number;
  installmentCount: Number;
  history: Array<{
    status: string;
    date: string;
  }>;
}

export interface TransactionsState {
  fetchStatus: FetchStatus;
  transactions: List<Transaction>;
}
