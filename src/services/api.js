import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; // Backend URL

// Función de login para obtener el token
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.access_token) {
    localStorage.setItem('accessToken', response.data.access_token);  // Cambia 'token' por 'accessToken'
  }
  return response.data;
};

// Función para registrar un nuevo usuario
export const registerUser = async (data) => {
  const response = await axios.post(`${API_URL}/users`, data);
  return response.data;
};

// Función para iniciar sesión (parece que esta es una duplicación de 'login')
export const loginUser = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

// Función para realizar una transferencia
export const transferMoney = async (data) => {
  const token = localStorage.getItem('accessToken');  // Asegúrate de obtener el token correctamente
  if (!token) {
    throw new Error('Token not found');  // Verifica que el token esté disponible
  }
  const response = await axios.post(`${API_URL}/transfer`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Función para obtener la lista de usuarios disponibles
export const getAvailableUsers = async () => {
  const token = localStorage.getItem('accessToken');  // Asegúrate de obtener el token correctamente
  if (!token) {
    throw new Error('Token not found');  // Verifica que el token esté disponible
  }
  const response = await axios.get(`${API_URL}/users/available`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // Retorna la lista de usuarios
};

// Función para obtener los detalles del usuario autenticado
export const getUserDetails = async () => {
  const token = localStorage.getItem('accessToken');  // Asegúrate de obtener el token
  if (!token) {
    throw new Error('Token not found');
  }
  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,  // Adjunta el token en el encabezado
    },
  });
  return response.data;
};

// Función para obtener las transacciones del usuario autenticado
export const getTransactions = async () => {
  const token = localStorage.getItem('accessToken');  // Asegúrate de obtener el token
  if (!token) {
    throw new Error('Token not found');
  }
  const response = await axios.get(`${API_URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,  // Adjunta el token en el encabezado
    },
  });
  return response.data;
};
