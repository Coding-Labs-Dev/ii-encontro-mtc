import { action, ActionType } from 'typesafe-actions';

export const createAlert = (data: any) => action('Alert/CREATE_ALERT', data);

export const removeAlert = (data: any) => action('Alert/REMOVE_ALERT', data);

export type AlertAction =
  | ActionType<typeof createAlert>
  | ActionType<typeof removeAlert>;
