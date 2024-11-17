/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { getUserDetails, getTransactions } from '../services/api';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState({ sent: [], received: [] });
  const [message, setMessage] = useState('');

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

  return (
    <div className="user-details-container">
      <h2 className="page-title">Detalles del Usuario</h2>
      {user ? (
        <div className="user-info-card">
          <div className="card-content">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Saldo:</strong> ${user.balance.toFixed(2)}</p>
          </div>
        </div>
      ) : (
        <p className="error-message">{message}</p>
      )}

      <div className="transactions-container">
        <h3 className="section-title">Historial de Transferencias Enviadas</h3>
        {transactions.sent.length > 0 ? (
          <div className="transaction-cards">
            {transactions.sent.map((transaction, index) => (
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

        <h3 className="section-title">Historial de Transferencias Recibidas</h3>
        {transactions.received.length > 0 ? (
          <div className="transaction-cards">
            {transactions.received.map((transaction, index) => (
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
      </div>
    </div>
  );
};

export default UserDetails;
