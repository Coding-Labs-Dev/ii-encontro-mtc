import React from 'react';

import Route from '~/components/Route';

import Home from '~/pages/Home';

const PublicRoutes: React.FC = () => (
  <Route path="/" exact component={Home} isPrivate={false} />
);

export default PublicRoutes;
