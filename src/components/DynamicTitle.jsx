// src/components/DynamicTitle.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Cambiar el título según la ruta
    if (path === '/') {
      document.title = 'Página Principal - CashCompi';
    } else if (path === '/login') {
      document.title = 'Iniciar Sesión - CashCompi';
    } else if (path === '/register') {
      document.title = 'Registrarse - CashCompi';
    }
    else if (path === '/transfer') {
      document.title = 'Transferencia - CashCompi';
    }
    else if (path === '/user-details') {
      document.title = 'Detalles del Usuario - CashCompi';
    }
    else {
      document.title = 'Pagina no Econtrada - CashCompi';
    }
  }, [location]);

  return null; // No renderiza nada, solo actualiza el título
};

export default DynamicTitle;
