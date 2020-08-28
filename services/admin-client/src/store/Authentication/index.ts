import createState from 'store/util/createState';
import { AuthenticationState } from './types';
import { FetchStatus } from '../util/fetchStatus';
import { AuthenticationAction } from './actions';

export const INITIAL_STATE = createState<AuthenticationState>({
  FetchStatus: FetchStatus.notFetched,
  fetchSession: FetchStatus.notFetched,
  checkedSession: false,
  isAuth: false,
});

const authenticationReducer = (
  state = INITIAL_STATE,
  action: AuthenticationAction
) => {
  switch (action.type) {
    case 'Authentication/FETCH_AUTHENTICATION_REQUEST':
      return state.set('FetchStatus', FetchStatus.fetching);
    case 'Authentication/FETCH_AUTHENTICATION_SUCCESS':
      return state.merge({
        FetchStatus: FetchStatus.fetched,
        isAuth: action.payload,
      });
    case 'Authentication/FETCH_AUTHENTICATION_FAILURE':
      return state.set('FetchStatus', FetchStatus.errorFetching);
    case 'Authentication/FETCH_CHECK_AUTHENTICATION_REQUEST':
      return state.set('fetchSession', FetchStatus.fetching);
    case 'Authentication/FETCH_CHECK_AUTHENTICATION_SUCCESS':
      return state.merge({
        fetchSession: FetchStatus.fetched,
        checkedSession: true,
        isAuth: action.payload,
      });
    case 'Authentication/FETCH_CHECK_AUTHENTICATION_FAILURE':
      return state.merge({
        fetchSession: FetchStatus.errorFetching,
        checkedSession: true,
      });
    default:
      return state;
  }
};

export default authenticationReducer;
