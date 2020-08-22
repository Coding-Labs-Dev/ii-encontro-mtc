import { action } from 'typesafe-actions';
import { ActionTypes } from './types';

export const createAlert = (data: any) =>
  action(ActionTypes.CREATE_ALERT, data);

export const removeAlert = (data: any) =>
  action(ActionTypes.REMOVE_ALERT, data);
