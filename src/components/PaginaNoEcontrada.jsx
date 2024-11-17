/* eslint-disable no-unused-vars */
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Icono de advertencia

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <FaExclamationTriangle className="not-found-icon" />
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">La ruta que buscas no existe.</p>
      </div>
    </div>
  );
};

export default NotFound;
