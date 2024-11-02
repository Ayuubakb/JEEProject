// src/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('accessToken');
  const userId = localStorage.getItem('userId');
  const { id } = useParams();

  if (!isAuthenticated || userId !== id) {
    return <Navigate to='/auth/login' />;
  }

  return <Outlet />;
};

export default PrivateRoute;
