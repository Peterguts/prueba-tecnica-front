import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthProvider, { AuthContext } from './AuthContext';
import Principal from './components/principal/PublicoView';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
        <Router>
          <Routes>
            <Route path="/Principal" element={<Principal />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/" element={<AuthRedirect />} />
          </Routes>
        </Router>
    </AuthProvider>
  );
};

const AuthRedirect = () => {
  const { role } = React.useContext(AuthContext);
  console.log(`AuthRedirect: role is ${role}`);
  return role ? <Navigate to={role === 'Administrador' ? '/Dashboard' : '/Login'} /> : <Navigate to="/Login" />;
};

export default App;