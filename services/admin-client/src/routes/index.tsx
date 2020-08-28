import React from 'react';
import { Switch } from 'react-router-dom';

import { useSelector } from 'react-redux';
import * as AuthenticationSelectors from 'store/Authentication/selectors';

import { RootState } from '~/store/rootState';

import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

export default function Routes() {
  const state = useSelector((rootState: RootState) => rootState);
  const isSigned = AuthenticationSelectors.isAuth(state);

  return <Switch>{isSigned ? <PrivateRoutes /> : <PublicRoutes />}</Switch>;
}
