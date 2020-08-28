import { INITIAL_STATE as alerts } from './Alert';
import { INITIAL_STATE as authentication } from './Authentication';

export interface RootState {
  alerts: typeof alerts;
  authentication: typeof authentication;
}

const initialState: RootState = {
  alerts,
  authentication,
};

export default initialState;
