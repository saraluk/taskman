import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import PageLayout from '../components/PageLayout';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={LoginScreen} exact />
        <Route path='/signup' component={SignupScreen} exact />
        <Route path='/' component={PageLayout} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
