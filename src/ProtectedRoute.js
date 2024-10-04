import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROLE_CLAIM } from './config/config';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decodifica el token para obtener el rol del usuario
  const payload = JSON.parse(atob(token.split('.')[1]));
  const role = payload[ROLE_CLAIM];

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;