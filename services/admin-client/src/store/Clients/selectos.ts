import { RootState } from 'store/rootState';

export const getFetchStatus = (state: RootState) =>
  state.clients.get('fetchStatus');

export const getClients = (state: RootState) => state.clients.get('clients');
