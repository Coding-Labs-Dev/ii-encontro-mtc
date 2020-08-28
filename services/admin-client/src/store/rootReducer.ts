import { combineReducers } from 'redux';

import alerts from './Alert';
import authentication from './Authentication';

export default combineReducers({
  alerts,
  authentication,
});
