import React from 'react';
import { Switch } from 'react-router-dom';

import Route from '~/components/Route';

import Home from '~/pages/Home';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} isPrivate={false} />
    </Switch>
  );
}
