import React from 'react';

import DefaultLayout from '~/layouts/default';
import Route from '~/components/Route';

import DashBoard from '~/pages/Private/Dashboard';
import Clients from '~/pages/Private/Clients';
import Transactions from '~/pages/Private/Transactions';

const Routes: React.FC = () => (
  <DefaultLayout>
    <Route exact path="/" component={DashBoard} isPrivate />
    <Route exact path="/clients" component={Clients} isPrivate />
    <Route exact path="/transactions" component={Transactions} isPrivate />
  </DefaultLayout>
);

const PrivateRoutes: React.FC = () => (
  <Route path="/" component={Routes} isPrivate />
);

export default PrivateRoutes;
