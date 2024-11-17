/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserDetails } from '../services/api'; // Importa la función para obtener detalles del usuario

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');  // Para mostrar errores
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // Estado para controlar el menú en móviles
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('accessToken'); // Verifica si hay token

  // Obtener el nombre del usuario cuando el componente se monta
  useEffect(() => {
    const path = location.pathname;
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

  // Maneja la apertura y cierre del menú en móvil
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cierra el menú después de que el usuario haga clic en una opción
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <button className="hamburger" onClick={toggleMenu}>
          &#9776; {/* Símbolo de hamburguesa */}
        </button>
      </div>

      {/* Menú */}
      <ul className={`navbar-list ${isMenuOpen ? 'open' : ''}`}>
        {!isAuthenticated ? (
          <>
            <li className="navbar-item" onClick={closeMenu}>
              <Link to="/login" className="navbar-link">Login</Link>
            </li>
            <li className="navbar-item" onClick={closeMenu}>
              <Link to="/register" className="navbar-link">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-item" onClick={closeMenu}>
              <Link to="/user-details" className="navbar-link">Detalle del Usuario</Link>
            </li>
            <li className="navbar-item" onClick={closeMenu}>
              <Link to="/transfer" className="navbar-link">Transferir</Link>
            </li>
          </>
        )}
      </ul>

      {/* Sección del usuario y logout */}
      <div className="navbar-user-section">
        {isAuthenticated && (
          <span className="navbar-user">Hola, {userName}</span>
        )}
        {isAuthenticated && (
          <button onClick={handleLogout} className="navbar-button">
            Salir
          </button>
        )}
      </div>

      {/* Muestra errores */}
      {error && <p className="error-message">{error}</p>}
    </nav>
  );
};

export default Navbar;
