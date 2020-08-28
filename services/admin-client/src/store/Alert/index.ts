import { v4 as uuid } from 'uuid';
import { List } from 'immutable';
import { Reducer } from 'redux';
import { ActionTypes, AlertState } from './types';

export const INITIAL_STATE: AlertState = List();

const alertReducer: Reducer<AlertState> = (
  state = INITIAL_STATE,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.CREATE_ALERT:
      return state.push({ ...payload, id: uuid() });
    case ActionTypes.REMOVE_ALERT: {
      const index = state.findIndex(alert => alert.id === payload.id);
      return state.remove(index);
    }
    default:
      return state;
  }
};

export default alertReducer;
