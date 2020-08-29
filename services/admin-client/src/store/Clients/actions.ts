import { AnyAction } from 'redux';
import { action, ActionType } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store/rootState';
import { createAlert } from 'store/Alert/actions';
import * as api from 'services/api/clients';
import { Client } from './types';

export const fetchClientsRequest = () =>
  action('Clients/FETCH_CLIENTS_REQUEST');

export const fetchClientsSuccess = (payload: Array<Client>) =>
  action('Clients/FETCH_CLIENTS_SUCCESS', payload);

export const fetchClientsFailure = () =>
  action('Clients/FETCH_CLIENTS_FAILURE');

export const fetchClients = (): ThunkAction<
  void,
  RootState,
  undefined,
  AnyAction
> => async dispatch => {
  dispatch(fetchClientsRequest());
  try {
    const data = await api.getClients();
    dispatch(fetchClientsSuccess(data));
  } catch (e) {
    dispatch(createAlert({ content: e.message, type: 'error' }));
    dispatch(fetchClientsFailure());
  }
};

export type ClientsAction =
  | ActionType<typeof fetchClientsRequest>
  | ActionType<typeof fetchClientsSuccess>
  | ActionType<typeof fetchClientsFailure>;
