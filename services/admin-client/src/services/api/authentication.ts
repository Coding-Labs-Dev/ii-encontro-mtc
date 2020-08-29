import api, { parseError } from 'services/api';

export interface SignInPayload {
  isAuth: boolean;
  verificationToken: string;
}

export interface CheckSessionPayload {
  isAuth: boolean;
}

export const signIn = (
  email: string,
  password: string,
  saveSession: boolean
): Promise<SignInPayload> =>
  api
    .post(
      '/sessions',
      { email, password, saveSession },
      {
        withCredentials: true,
      }
    )
    .then(response => response.data)
    .catch(parseError);

export const checkSession = (): Promise<CheckSessionPayload> =>
  api
    .get('/sessions', {
      withCredentials: true,
    })
    .then(response => response.data);
