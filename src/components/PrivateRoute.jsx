/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken'); // Verifica si hay un token
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
