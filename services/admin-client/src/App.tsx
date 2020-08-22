import React from 'react';
import { Router } from 'react-router-dom';

import ThemeContextProvider from 'components/ThemeContext';
import Alerts from 'components/Alerts';
import history from 'services/history';
import IntlProvider from 'utils/i18n';
import Routes from '~/routes';

const App = () => (
  <IntlProvider>
    <ThemeContextProvider>
      <Alerts />
      <Router history={history}>
        <Routes />
      </Router>
    </ThemeContextProvider>
  </IntlProvider>
);

export default App;
