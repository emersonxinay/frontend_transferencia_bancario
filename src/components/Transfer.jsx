/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { transferMoney, getAvailableUsers } from '../services/api';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Transfer = () => {
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Usar el hook useNavigate

  // Obtener los usuarios disponibles cuando el componente se monta
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAvailableUsers(); // Llamada a la API para obtener los usuarios
        setUsers(response); // Establecer los usuarios en el estado
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        setMessage('No se pudieron cargar los usuarios');
      }
    };

    fetchUsers();
  }, []); // Este efecto solo se ejecutará una vez cuando el componente se monte

  // Manejo de la transferencia
  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const response = await transferMoney({ receiver_id: receiverId, amount: parseFloat(amount) });
      setMessage(response.message); // Mostrar el mensaje de éxito o error
      if (response.message === 'Transferencia exitosa') {
        navigate('/user-details'); // Redirigir a la página de detalles del usuario
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al realizar la transferencia');
    }
  };

  return (
    <div>
      <h2>Realizar Transferencia</h2>
      <form onSubmit={handleTransfer}>
        <div>
          <label>Selecciona el receptor:</label>
          <select
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            required
          >
            <option value="">Selecciona un receptor</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Monto:</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Transferir</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Transfer;
