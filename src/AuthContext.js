import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const login = (role) => {
    setUser(true);
    setRole(role);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    console.log('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;