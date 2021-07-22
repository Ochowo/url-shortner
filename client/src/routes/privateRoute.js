/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { authSelector } from '../features/Signup/signUpSlice';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector(authSelector);
  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      ))}
    />
  );
};
PrivateRoute.propTypes = {
  component: PropTypes.func,
};

export default PrivateRoute;
