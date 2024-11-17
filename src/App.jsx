/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './AppRoutes'; // Mantén tus rutas en un archivo separado
import DynamicTitle from './components/DynamicTitle';
import './App.css'
const App = () => {
  return (
    <Router>
      <DynamicTitle />
      {/* Incluye el Navbar */}
      <Navbar />


      {/* Rutas definidas en AppRoutes */}
      <AppRoutes />



    </Router>
  );
};

export default App;
