/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './AppRoutes'; // Mantén tus rutas en un archivo separado

const App = () => {
  return (
    <Router>
      {/* Incluye el Navbar */}
      <Navbar />

      {/* Tus rutas */}
      <AppRoutes />
    </Router>
  );
};

export default App;
