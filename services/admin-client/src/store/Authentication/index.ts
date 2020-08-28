import createState from 'store/util/createState';
import { AuthenticationState } from './types';
import { fetchStatus } from '../util/fetchStatus';
import { AuthenticationAction } from './actions';

export const INITIAL_STATE = createState<AuthenticationState>({
  fetchStatus: fetchStatus.notFetched,
  fetchSession: fetchStatus.notFetched,
  checkedSession: false,
  isAuth: false,
});

const authenticationReducer = (
  state = INITIAL_STATE,
  action: AuthenticationAction
) => {
  switch (action.type) {
    case 'Authentication/FETCH_AUTHENTICATION_REQUEST':
      return state.set('fetchStatus', fetchStatus.fetching);
    case 'Authentication/FETCH_AUTHENTICATION_SUCCESS':
      return state.merge({
        fetchStatus: fetchStatus.fetched,
        isAuth: action.payload,
      });
    case 'Authentication/FETCH_AUTHENTICATION_FAILURE':
      return state.set('fetchStatus', fetchStatus.errorFetching);
    case 'Authentication/FETCH_CHECK_AUTHENTICATION_REQUEST':
      return state.set('fetchSession', fetchStatus.fetching);
    case 'Authentication/FETCH_CHECK_AUTHENTICATION_SUCCESS':
      return state.merge({
        fetchSession: fetchStatus.fetched,
        checkedSession: true,
        isAuth: action.payload,
      });
    case 'Authentication/FETCH_CHECK_AUTHENTICATION_FAILURE':
      return state.merge({
        fetchSession: fetchStatus.errorFetching,
        checkedSession: true,
      });
    default:
      return state;
  }
};

export default authenticationReducer;
