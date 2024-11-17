/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserDetails } from '../services/api'; // Importa la función para obtener detalles del usuario

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');  // Para mostrar errores
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('accessToken'); // Verifica si hay token

  // Obtener el nombre del usuario cuando el componente se monta
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!isAuthenticated) return; // No hace nada si no está autenticado

      try {
        const userDetails = await getUserDetails(); // Obtén los detalles del usuario desde la API
        setUserName(userDetails.name); // Guarda el nombre del usuario en el estado
      } catch (error) {
        setError('Ya venció su inicio de sesión, vuelve a iniciar: ');
        console.error('Ya venció su inicio de sesión, vuelve a iniciar:', error);
        setTimeout(() => {
          setError(""); // Limpia el mensaje
        }, 5000);
      }
    };

    fetchUserDetails();
  }, [isAuthenticated]); // Solo se ejecuta cuando `isAuthenticated` cambia

  const handleLogout = () => {
    localStorage.removeItem('accessToken');  // Elimina el token del localStorage
    navigate('/login'); // Redirige al login después de cerrar sesión
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {!isAuthenticated ? (
          <>
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">Login</Link>
            </li>
            <li className="navbar-item">
              <Link to="/register" className="navbar-link">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-item">
              <Link to="/user-details" className="navbar-link">User Details</Link>
            </li>
            <li className="navbar-item">
              <Link to="/transfer" className="navbar-link">Transfer</Link>
            </li>
          </>
        )}
      </ul>
      <div className="navbar-user-section">
        {isAuthenticated && (
          <span className="navbar-user">Hola, {userName}</span>
        )}
        {isAuthenticated && (
          <button onClick={handleLogout} className="navbar-button">
            Logout
          </button>
        )}
      </div>
      {error && <p className="error-message">{error}</p>} {/* Muestra errores */}
    </nav>


  );
};

export default Navbar;
