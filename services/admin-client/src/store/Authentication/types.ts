import { fetchStatus } from 'store/util/fetchStatus';

export interface AuthenticationState {
  fetchStatus: fetchStatus;
  fetchSession: fetchStatus;
  isAuth: boolean;
  checkedSession: boolean;
}
