// src/components/DynamicTitle.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Objeto que mapea las rutas a los títulos correspondientes
    const titleMap = {
      '/': 'Página Principal - CashCompi',
      '/login': 'Iniciar Sesión - CashCompi',
      '/register': 'Registrarse - CashCompi',
      '/transfer': 'Transferencia - CashCompi',
      '/user-details': 'Detalles del Usuario - CashCompi',
    };

    // Asignar el título según la ruta, o un valor por defecto si la ruta no está en el objeto
    document.title = titleMap[path] || 'Página no Encontrada - CashCompi';
  }, [location]);

  return null; // No renderiza nada, solo actualiza el título
};

export default DynamicTitle;