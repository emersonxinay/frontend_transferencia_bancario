/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { getUserDetails, getTransactions } from '../services/api';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState({ sent: [], received: [] });
  const [message, setMessage] = useState('');
  const [currentPageSent, setCurrentPageSent] = useState(1); // Página actual para enviadas
  const [currentPageReceived, setCurrentPageReceived] = useState(1); // Página actual para recibidas

  const transactionsPerPage = 5; // Número de transacciones por página

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserDetails();
        setUser(userData);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Error al obtener datos del usuario');
      }
    };

    const fetchTransactions = async () => {
      try {
        const transactionData = await getTransactions();
        setTransactions(transactionData);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Error al obtener el historial de transferencias');
      }
    };

    fetchUser();
    fetchTransactions();
  }, []);

  // Función para obtener las transferencias de la página actual (enviadas)
  const paginateTransactions = (transactions, currentPage) => {
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    return transactions.slice(startIndex, endIndex);
  };

  // Función para cambiar de página
  const handlePageChange = (direction, type) => {
    if (type === 'sent') {
      setCurrentPageSent((prev) => prev + direction);
    } else {
      setCurrentPageReceived((prev) => prev + direction);
    }
  };

  // Obtener las transferencias enviadas y recibidas de la página actual
  const sentTransactionsToShow = paginateTransactions(transactions.sent, currentPageSent);
  const receivedTransactionsToShow = paginateTransactions(transactions.received, currentPageReceived);

  return (
    <div className="user-details-container">
      <h2 className="page-title">Detalles del Usuario</h2>
      {user ? (
        <div className="user-info-card-user">
          <div className="card-content">
            <p ><strong className='card-title-user'>ID:</strong> <strong className='card-parrafo-user'>  {user.id} </strong></p>
            <p ><strong className='card-title-user'>Nombre:</strong> <strong className='card-parrafo-user'> {user.name} </strong></p>
            <p ><strong className='card-title-user'>Email:</strong> <strong className='card-parrafo-user'> {user.email} </strong></p>
            <p ><strong className='card-title-user'>Saldo:</strong><strong className='card-parrafo-user'>  ${user.balance.toFixed(2)} </strong></p>
          </div>
        </div>
      ) : (
        <p className="error-message">{message}</p>
      )}

      <div className="transactions-container">
        <h3 className="section-title-user">Historial de Transferencias Enviadas</h3>
        {sentTransactionsToShow.length > 0 ? (
          <div className="transaction-cards">
            {sentTransactionsToShow
              .sort((a, b) => new Date(b.date) - new Date(a.date)) // Ordena por fecha descendente
              .map((transaction, index) => (
                <div key={index} className="transaction-card">
                  <div className="card-content">
                    <h4>Enviado a {transaction.name}</h4>
                    <p><strong>Monto:</strong> ${transaction.amount}</p>
                    <p><strong>Fecha:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p>No tienes transferencias enviadas.</p>
        )}

        {/* Paginación para transferencias enviadas */}
        {transactions.sent.length > transactionsPerPage && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(-1, 'sent')}
              disabled={currentPageSent === 1}
            >
              Anterior
            </button>
            <span>
              Página {currentPageSent} de {Math.ceil(transactions.sent.length / transactionsPerPage)}
            </span>
            <button
              onClick={() => handlePageChange(1, 'sent')}
              disabled={currentPageSent * transactionsPerPage >= transactions.sent.length}
            >
              Siguiente
            </button>
          </div>
        )}


        <h3 className="section-title-user">Historial de Transferencias Recibidas</h3>
        {receivedTransactionsToShow.length > 0 ? (
          <div className="transaction-cards">
            {receivedTransactionsToShow
              .sort((a, b) => new Date(b.date) - new Date(a.date)) // Ordena por fecha descendente
              .map((transaction, index) => (
                <div key={index} className="transaction-card">
                  <div className="card-content">
                    <h4>Recibido de {transaction.name}</h4>
                    <p><strong>Monto:</strong> ${transaction.amount}</p>
                    <p><strong>Fecha:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p>No tienes transferencias recibidas.</p>
        )}

        {/* Paginación para transferencias recibidas */}
        {transactions.received.length > transactionsPerPage && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(-1, 'received')}
              disabled={currentPageReceived === 1}
            >
              Anterior
            </button>
            <span>
              Página {currentPageReceived} de {Math.ceil(transactions.received.length / transactionsPerPage)}
            </span>
            <button
              onClick={() => handlePageChange(1, 'received')}
              disabled={currentPageReceived * transactionsPerPage >= transactions.received.length}
            >
              Siguiente
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default UserDetails;
