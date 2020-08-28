import { RootState } from '~/store/rootState';
import { fetchStatus } from '../util/fetchStatus';

export const isFetching = (state: RootState) =>
  state.authentication.get('fetchStatus') === fetchStatus.fetching;
export const isFetched = (state: RootState) =>
  state.authentication.get('fetchStatus') === fetchStatus.fetched;
export const isAuth = (state: RootState) => state.authentication.get('isAuth');

export const isFetchedSession = (state: RootState) =>
  [fetchStatus.fetched, fetchStatus.errorFetching].includes(
    state.authentication.get('fetchSession')
  );
export const isFetchingSession = (state: RootState) =>
  state.authentication.get('fetchSession') === fetchStatus.fetching;
export const isSessionChecked = (state: RootState) =>
  state.authentication.get('checkedSession');
