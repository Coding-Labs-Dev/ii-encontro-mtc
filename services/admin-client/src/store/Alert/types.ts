import { List } from 'immutable';

export enum ActionTypes {
  CREATE_ALERT = '@Alert/CREATE_ALERT',
  REMOVE_ALERT = '@Alert/REMOVE_ALERT',
}

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface Alert {
  id: string;
  type: AlertType;
  content: React.ReactNode;
  options: {
    onClose?: (
      event: React.SyntheticEvent<any, Event> | null,
      reason: string,
      id: string | number | undefined
    ) => void;
  };
  dismissed: boolean;
}

export type AlertState = List<Alert>;
