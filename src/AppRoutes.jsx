/* eslint-disable no-unused-vars */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserDetails from './components/UserDetails';
import Transfer from './components/Transfer';
import PrivateRoute from './components/PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas */}
      <Route
        path="/user-details"
        element={
          <PrivateRoute>
            <UserDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/transfer"
        element={
          <PrivateRoute>
            <Transfer />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
