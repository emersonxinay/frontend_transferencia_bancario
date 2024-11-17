/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { transferMoney, getAvailableUsers } from '../services/api';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Transfer = () => {
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [isProcessing, setIsProcessing] = useState(false); // Estado para manejar el procesamiento

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
        setMessageType("error");
      }
    };

    fetchUsers();
  }, []); // Este efecto solo se ejecutará una vez cuando el componente se monte

  // Manejo de la transferencia
  const handleTransfer = async (e) => {
    e.preventDefault();

    // Validar que ambos campos estén llenos
    if (!receiverId || !amount) {
      setMessage('Por favor, complete todos los campos.');
      setMessageType("error");
      return;
    }

    setIsProcessing(true); // Iniciar el proceso de transferencia

    try {
      const response = await transferMoney({ receiver_id: receiverId, amount: parseFloat(amount) });
      console.log('Respuesta de la API:', response);  // Verificar la respuesta de la API

      setMessage(response.message); // Mostrar el mensaje de éxito o error
      setMessageType("success");

      if (response.message === 'Transferencia exitosa') {
        console.log('Transferencia exitosa');

        // Limpiar los campos después de una transferencia exitosa
        setReceiverId("");  // Limpiar el select (ID del receptor)
        setAmount("");      // Limpiar el input (Monto)

        // Verificar que los valores de los campos se hayan limpiado
        console.log('ReceiverId:', receiverId);
        console.log('Amount:', amount);

        navigate('/user-details'); // Redirigir a la página de detalles del usuario
      }
    } catch (error) {
      console.log('Error en la transferencia:', error);
      setMessage(error.response?.data?.message || 'Error al realizar la transferencia');
      setMessageType("error");
    } finally {
      setIsProcessing(false); // Finalizar el proceso de transferencia
    }
  };

  return (
    <div className="transfer-card">
      <h2>Realizar Transferencia</h2>
      <form onSubmit={handleTransfer}>
        <div className="input-group">
          <label>Selecciona el receptor:</label>
          <div className="select-container">
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

        </div>
        <div className="input-group">
          <label>Monto:</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Ingresa el monto"
          />
        </div>
        <button type="submit" className="submit-btn-t" disabled={isProcessing}>
          {isProcessing ? 'Procesando...' : 'Transferir'}
        </button>
      </form>
      {message && (
        <p className={`message ${messageType === "error" ? "error" : "success"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Transfer;
