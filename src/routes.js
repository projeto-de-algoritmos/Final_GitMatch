import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/signUp" component={SignUp} />
    <Route path="/home" component={Home} />
  </Switch>
);

export default Routes;