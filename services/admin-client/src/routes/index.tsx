import React from 'react';
import { Switch } from 'react-router-dom';

import PublicRoutes from './PublicRoutes';

export default function Routes() {
  return (
    <Switch>
      <PublicRoutes />
    </Switch>
  );
}
