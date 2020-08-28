/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';
import * as AuthenticationSelectors from 'store/Authentication/selectors';

import { RootState } from '~/store/rootState';

interface Props {
  component: React.FC<any>;
  path: string;
  exact?: boolean;
  isPrivate?: boolean;
}

const RouteWrapper: React.FC<Props> = ({
  component: Component,
  path,
  exact = false,
  isPrivate = true,
}) => {
  const state = useSelector((rootState: RootState) => rootState);
  const isSigned = AuthenticationSelectors.isAuth(state);

  if (!isSigned && isPrivate) {
    return <Redirect to="/" />;
  }

  return (
    <Route
      path={path}
      exact={exact}
      render={props => <Component {...props} />}
    />
  );
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  exact: false,
};

export default RouteWrapper;
