import React from 'react';
import { Switch as Router, Route } from 'react-router-dom';
import SignUp from '../features/Signup/Signup';
import Dashboard from '../features/DashBoard/Dashboard';
import SignIn from '../features/Signup/Signin';
import PrivateRoute from './privateRoute';
import Home from '../features/Home/Home';

const App = () => (
  <Router>
    <Route path="/" exact component={Home} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/signin" exact component={SignIn} />
    <PrivateRoute path="/dashboard" exact component={Dashboard} />
  </Router>
);
export default App;
