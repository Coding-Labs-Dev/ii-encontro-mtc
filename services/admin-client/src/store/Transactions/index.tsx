import { List } from 'immutable';

import createState from 'store/util/createState';
import { FetchStatus } from 'store/util/fetchStatus';

import { TransactionsState, Transaction } from './types';
import { TransactionsAction } from './actions';

export const INITIAL_STATE = createState<TransactionsState>({
  fetchStatus: FetchStatus.notFetched,
  transactions: List<Transaction>(),
});

const transactionsReducer = (
  state = INITIAL_STATE,
  action: TransactionsAction
) => {
  switch (action.type) {
    case 'Transactions/FETCH_TRANSACTIONS_REQUEST':
      return state.set('fetchStatus', FetchStatus.fetching);
    case 'Transactions/FETCH_TRANSACTIONS_SUCCESS':
      return state.merge({
        fetchStatus: FetchStatus.fetched,
        transactions: List(action.payload),
      });
    case 'Transactions/FETCH_TRANSACTIONS_FAILURE':
      return state.set('fetchStatus', FetchStatus.errorFetching);
    default:
      return state;
  }
};

export default transactionsReducer;
