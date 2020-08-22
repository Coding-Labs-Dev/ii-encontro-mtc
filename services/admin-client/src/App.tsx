import React from 'react';
import { Router } from 'react-router-dom';

import ThemeContextProvider from '~/components/ThemeContext';
import Alerts from '~/components/Alerts';
import Routes from '~/routes';
import history from '~/services/history';

const App = () => (
  <ThemeContextProvider>
    <Alerts />
    <Router history={history}>
      <Routes />
    </Router>
  </ThemeContextProvider>
);

export default App;
