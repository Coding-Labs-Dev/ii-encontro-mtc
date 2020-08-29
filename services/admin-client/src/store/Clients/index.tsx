import { List } from 'immutable';

import createState from 'store/util/createState';
import { FetchStatus } from 'store/util/fetchStatus';

import { ClientsState, Client } from './types';
import { ClientsAction } from './actions';

export const INITIAL_STATE = createState<ClientsState>({
  fetchStatus: FetchStatus.notFetched,
  clients: List<Client>(),
});

const clientsReducer = (state = INITIAL_STATE, action: ClientsAction) => {
  switch (action.type) {
    case 'Clients/FETCH_CLIENTS_REQUEST':
      return state.set('fetchStatus', FetchStatus.fetching);
    case 'Clients/FETCH_CLIENTS_SUCCESS':
      return state.merge({
        fetchStatus: FetchStatus.fetched,
        clients: List(action.payload),
      });
    case 'Clients/FETCH_CLIENTS_FAILURE':
      return state.set('fetchStatus', FetchStatus.errorFetching);
    default:
      return state;
  }
};

export default clientsReducer;
