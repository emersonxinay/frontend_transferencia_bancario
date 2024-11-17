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
        setError('Error al obtener los detalles del usuario: ' + error.message);
        console.error('Error al obtener los detalles del usuario:', error);
      }
    };

    fetchUserDetails();
  }, [isAuthenticated]); // Solo se ejecuta cuando `isAuthenticated` cambia

  const handleLogout = () => {
    localStorage.removeItem('accessToken');  // Elimina el token del localStorage
    navigate('/login'); // Redirige al login después de cerrar sesión
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '15px' }}>
        {!isAuthenticated ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/user-details">User Details</Link>
            </li>
            <li>
              <Link to="/transfer">Transfer</Link>
            </li>
            <li>
              <span>Hola, {userName}</span> {/* Mostrar el nombre del usuario */}
            </li>
            <li>
              <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra errores */}
    </nav>
  );
};

export default Navbar;
