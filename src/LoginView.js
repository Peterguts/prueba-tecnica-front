// src/LoginView.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para manejar el inicio de sesión
    navigate('/admin'); // Redirige a la vista de administrador después de iniciar sesión
  };

  return (
    <LoginContainer>
      <Logo src="/img/logoCortoMobile.png" alt="Logo" />
      <LoginForm onSubmit={handleSubmit}>
        <Input type="text" placeholder="Usuario" required />
        <Input type="password" placeholder="Contraseña" required />
        <Button type="submit">Iniciar Sesión</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginView;