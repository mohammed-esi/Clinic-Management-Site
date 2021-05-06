import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Login from '../auth/Login';
import DashboardRouting from '../routing/DashboardRouting';

function Routes() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Login} />
        <PrivateRoute path='/dashboard' component={DashboardRouting} />
      </Switch>
    </>
  );
}

export default Routes;
