import React, { Component, useContext } from 'react';
import Router from 'next/router';
import { UserContext } from '../contexts/UserContext';
import authService from '../services/auth.service';

const login = '/login'; // Define your login route address.

const PrivateRoute = Component => ({ ...props }) => {

  if (typeof window !== 'undefined') {
    const currentUser = authService.getCurrentUser()
    if (currentUser === null) {
      Router.replace(login)
    }
    return (
      (
        <Component {...props} />
      )
    );
  }
  return (
    <></>
  );
};

export default PrivateRoute;