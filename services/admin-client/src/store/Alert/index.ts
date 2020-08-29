import { v4 as uuid } from 'uuid';
import { List } from 'immutable';
import { AlertState, Alert } from './types';
import { AlertAction } from './actions';

export const INITIAL_STATE: AlertState = List<Alert>();

const alertReducer = (state = INITIAL_STATE, action: AlertAction) => {
  switch (action.type) {
    case 'Alert/CREATE_ALERT':
      return state.push({ ...action.payload, id: uuid() });
    case 'Alert/REMOVE_ALERT': {
      const index = state.findIndex(alert => alert.id === action.payload.id);
      return state.remove(index);
    }
    default:
      return state;
  }
};

export default alertReducer;
