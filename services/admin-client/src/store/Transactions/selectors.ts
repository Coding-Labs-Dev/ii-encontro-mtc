import { RootState } from 'store/rootState';

export const getFetchStatus = (state: RootState) =>
  state.transactions.get('fetchStatus');

export const getTransactions = (state: RootState) =>
  state.transactions.get('transactions');
