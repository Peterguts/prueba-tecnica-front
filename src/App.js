import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthProvider from './AuthContext';
import Login from './components/login/Login';
import Principal from './components/principal/PublicoView';
import AdminDashboard from './components/dashboard/AdminDashboard';
import UserDashboard from './components/dashboard/UserDashboard';
import ProtectedRoute from './ProtectedRoute';
import { ROLE_CLAIM} from './config/config';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/principal" element={<Principal />} />
          <Route element={<ProtectedRoute allowedRoles={['Administrador']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['Colaborador']} />}>
            <Route path="/user" element={<UserDashboard />} />
          </Route>
          <Route path="/" element={<AuthRedirect />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const AuthRedirect = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }

  const payload = JSON.parse(atob(token.split('.')[1]));
  const role = payload[ROLE_CLAIM];

  if (role === 'Administrador') {
    return <Navigate to="/admin" />;
  } else if (role === 'Colaborador') {
    return <Navigate to="/user" />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default App;