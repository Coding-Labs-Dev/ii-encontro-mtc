import { AnyAction } from 'redux';
import { action, ActionType } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store/rootState';
import { createAlert } from 'store/Alert/actions';
import * as api from 'services/api/authentication';
import {
  saveLocalStorageItem,
  removeLocalStorageItem,
  isLocaltStorageItemSet,
} from '~/utils/localStorage';
import { injectToken } from '~/services/api';

export const fetchAuthenticationRequest = () =>
  action('Authentication/FETCH_AUTHENTICATION_REQUEST');

export const fetchAuthenticationSuccess = (payload: boolean) =>
  action('Authentication/FETCH_AUTHENTICATION_SUCCESS', payload);

export const fetchAuthenticationFailure = () =>
  action('Authentication/FETCH_AUTHENTICATION_FAILURE');

export const fetchCheckAuthenticationRequest = () =>
  action('Authentication/FETCH_CHECK_AUTHENTICATION_REQUEST');

export const fetchCheckAuthenticationSuccess = (payload: boolean) =>
  action('Authentication/FETCH_CHECK_AUTHENTICATION_SUCCESS', payload);

export const fetchCheckAuthenticationFailure = () =>
  action('Authentication/FETCH_CHECK_AUTHENTICATION_FAILURE');

export const signIn = (
  email: string,
  password: string,
  saveSession: boolean
): ThunkAction<void, RootState, undefined, AnyAction> => async dispatch => {
  dispatch(fetchAuthenticationRequest());
  try {
    const result = await api.signIn(email, password, saveSession);
    const { isAuth, verificationToken } = result;
    injectToken(verificationToken);
    if (saveSession)
      saveLocalStorageItem('verificationToken', verificationToken);
    dispatch(fetchAuthenticationSuccess(isAuth));
  } catch (e) {
    dispatch(createAlert({ content: e.message, type: 'error' }));
    dispatch(fetchAuthenticationFailure());
  }
};

export const checkSession = (): ThunkAction<
  void,
  RootState,
  undefined,
  AnyAction
> => async dispatch => {
  if (!isLocaltStorageItemSet('verificationToken')) {
    dispatch(fetchCheckAuthenticationFailure());
    return;
  }
  dispatch(fetchCheckAuthenticationRequest());
  try {
    const result = await api.checkSession();
    const { isAuth } = result;
    dispatch(fetchCheckAuthenticationSuccess(isAuth));
  } catch (e) {
    removeLocalStorageItem('verificationToken');
    dispatch(fetchCheckAuthenticationFailure());
  }
};

export type AuthenticationAction =
  | ActionType<typeof fetchAuthenticationRequest>
  | ActionType<typeof fetchAuthenticationSuccess>
  | ActionType<typeof fetchAuthenticationFailure>
  | ActionType<typeof fetchCheckAuthenticationRequest>
  | ActionType<typeof fetchCheckAuthenticationSuccess>
  | ActionType<typeof fetchCheckAuthenticationFailure>;
