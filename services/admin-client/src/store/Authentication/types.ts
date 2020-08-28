import { FetchStatus } from 'store/util/fetchStatus';

export interface AuthenticationState {
  FetchStatus: FetchStatus;
  fetchSession: FetchStatus;
  isAuth: boolean;
  checkedSession: boolean;
}
