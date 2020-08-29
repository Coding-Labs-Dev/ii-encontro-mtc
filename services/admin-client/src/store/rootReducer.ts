import { combineReducers } from 'redux';

import alerts from './Alert';
import authentication from './Authentication';
import clients from './Clients';
import transactions from './Transactions';

export default combineReducers({
  alerts,
  authentication,
  clients,
  transactions,
});
