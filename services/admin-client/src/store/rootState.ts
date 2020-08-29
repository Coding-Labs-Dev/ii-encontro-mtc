import { INITIAL_STATE as alerts } from './Alert';
import { INITIAL_STATE as authentication } from './Authentication';
import { INITIAL_STATE as clients } from './Clients';

export interface RootState {
  alerts: typeof alerts;
  authentication: typeof authentication;
  clients: typeof clients;
}

const initialState: RootState = {
  alerts,
  authentication,
  clients,
};

export default initialState;
