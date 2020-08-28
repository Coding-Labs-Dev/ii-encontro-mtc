import React from 'react';
import { Router } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/rootState';
import * as AuthenticationSelectors from 'store/Authentication/selectors';

import ThemeContextProvider from 'components/ThemeContext';
import Alerts from 'components/Alerts';
import history from 'services/history';
import IntlProvider from 'utils/i18n';
import Routes from '~/routes';
import { checkSession } from './store/Authentication/actions';
import Loader from './components/Loader';

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((rootState: RootState) => rootState);
  const isFetchingSession = AuthenticationSelectors.isFetchingSession(state);
  const isFetchedSession = AuthenticationSelectors.isFetchedSession(state);
  const isSessionChecked = AuthenticationSelectors.isSessionChecked(state);

  if (!isFetchedSession && !isFetchingSession) {
    dispatch(checkSession());
  }

  return (
    <IntlProvider>
      <ThemeContextProvider>
        <Alerts />
        {!isSessionChecked ? (
          <Loader fullScreen />
        ) : (
          <Router history={history}>
            <Routes />
          </Router>
        )}
      </ThemeContextProvider>
    </IntlProvider>
  );
};

export default App;
