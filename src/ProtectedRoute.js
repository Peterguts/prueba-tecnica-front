import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element: Component }) => {
  const { user } = useContext(AuthContext);
  console.log(`ProtectedRoute: user is ${user ? 'logged in' : 'not logged in'}`);
  return user ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;