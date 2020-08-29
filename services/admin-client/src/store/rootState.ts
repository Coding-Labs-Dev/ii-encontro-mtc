import { INITIAL_STATE as alerts } from './Alert';
import { INITIAL_STATE as authentication } from './Authentication';
import { INITIAL_STATE as clients } from './Clients';
import { INITIAL_STATE as transactions } from './Transactions';

export interface RootState {
  alerts: typeof alerts;
  authentication: typeof authentication;
  clients: typeof clients;
  transactions: typeof transactions;
}

const initialState: RootState = {
  alerts,
  authentication,
  clients,
  transactions,
};

export default initialState;
