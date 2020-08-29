import { combineReducers } from 'redux';

import alerts from './Alert';
import authentication from './Authentication';
import clients from './Clients';

export default combineReducers({
  alerts,
  authentication,
  clients,
});
