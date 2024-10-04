import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ROUTES, TOKEN_STORAGE_KEY, ROLE_CLAIM, ADMIN_ROLE, USER_ROLE } from './config/config';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0; /* Ajusta este color según tu gama de colores */
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff; /* Ajusta este color según tu gama de colores */
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #0056b3; /* Ajusta este color según tu gama de colores */
  }
`;

const Logo = styled.img`
  width: 150px; /* Ajusta el tamaño según sea necesario */
  margin-bottom: 20px;
`;

const LoginView = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_ROUTES.LOGIN, {
        usuario,
        password,
      });

      console.log('Entra a la petición', response.data);
      const token = response.data;
      localStorage.setItem(TOKEN_STORAGE_KEY, token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Decodifica el token para obtener el rol del usuario
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Payload del token:', payload);
      const role = payload[ROLE_CLAIM];

      // Valida el rol del usuario
      if (role === ADMIN_ROLE || role === USER_ROLE) {
        localStorage.setItem('role', role);
        // Redirige al usuario al dashboard
        navigate('/dashboard');
      } else {
        alert('Rol no autorizado');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error al iniciar sesión:', error.response.data);
        alert(`Error: ${error.response.data}`);
      } else {
        console.error('Error al iniciar sesión:', error.message);
        alert('Error al conectar con el servidor');
      }
    }
  };

  return (
    <LoginContainer>
      <Logo src="/img/logoCortoMobile.png" alt="Logo" />
      <LoginForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Iniciar Sesión</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginView;