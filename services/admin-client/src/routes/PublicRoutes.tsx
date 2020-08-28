import React from 'react';

import Route from '~/components/Route';
import AuthLayout from '~/layouts/auth';

import SignIn from '~/pages/Public/SignIn';

const Routes: React.FC = () => (
  <AuthLayout>
    <Route path="/" component={SignIn} isPrivate={false} />
  </AuthLayout>
);

const PublicRoutes: React.FC = () => (
  <Route path="/" component={Routes} isPrivate={false} />
);

export default PublicRoutes;
