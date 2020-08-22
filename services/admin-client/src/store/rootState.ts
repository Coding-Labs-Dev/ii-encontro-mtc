import { INITIAL_STATE as alerts } from './Alert';
import { AlertState } from './Alert/types';

export interface RootState {
  alerts: AlertState;
}

const initialState: RootState = {
  alerts,
};

export default initialState;
