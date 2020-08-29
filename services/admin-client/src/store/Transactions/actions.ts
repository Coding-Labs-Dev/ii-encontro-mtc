import { AnyAction } from 'redux';
import { action, ActionType } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store/rootState';
import { createAlert } from 'store/Alert/actions';
import * as api from 'services/api/transactions';
import { Transaction } from './types';

export const fetchTransactionsRequest = () =>
  action('Transactions/FETCH_TRANSACTIONS_REQUEST');

export const fetchTransactionsSuccess = (payload: Array<Transaction>) =>
  action('Transactions/FETCH_TRANSACTIONS_SUCCESS', payload);

export const fetchTransactionsFailure = () =>
  action('Transactions/FETCH_TRANSACTIONS_FAILURE');

export const fetchTransactions = (): ThunkAction<
  void,
  RootState,
  undefined,
  AnyAction
> => async dispatch => {
  dispatch(fetchTransactionsRequest());
  try {
    const data = await api.getTransactions();
    dispatch(fetchTransactionsSuccess(data));
  } catch (e) {
    dispatch(createAlert({ content: e.message, type: 'error' }));
    dispatch(fetchTransactionsFailure());
  }
};

export type TransactionsAction =
  | ActionType<typeof fetchTransactionsRequest>
  | ActionType<typeof fetchTransactionsSuccess>
  | ActionType<typeof fetchTransactionsFailure>;
