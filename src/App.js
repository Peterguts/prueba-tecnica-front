import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthProvider, { AuthContext } from './AuthContext';
import ProductProvider from './ProductContext';
import Principal from './PublicoView';
import Login from './LoginView';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          <Routes>
            <Route path="/Principal" element={<Principal />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} />} />
            <Route path="/user" element={<ProtectedRoute element={<UserDashboard />} />} />
            <Route path="/" element={<AuthRedirect />} />
          </Routes>
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
};

const AuthRedirect = () => {
  const { role } = React.useContext(AuthContext);
  console.log(`AuthRedirect: role is ${role}`);
  return role ? <Navigate to={role === 'admin' ? '/admin' : '/user'} /> : <Navigate to="/login" />;
};

export default App;