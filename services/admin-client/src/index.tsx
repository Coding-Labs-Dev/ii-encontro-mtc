import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import 'typeface-roboto';
import 'typeface-poppins';

import store from '~/store';
import App from '~/App';
import * as serviceWorker from './serviceWorker';

const Application: React.FC = () => (
  <Provider store={store}>
    <SnackbarProvider maxSnack={5}>
      <App />
    </SnackbarProvider>
  </Provider>
);

if (process.env.NODE_ENV !== 'production') {
  const HotReload = hot(Application);
  ReactDOM.render(<HotReload />, document.getElementById('root'));
} else {
  ReactDOM.render(<Application />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
