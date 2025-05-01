import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  
  const login = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };
  
  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      currentPage, 
      setCurrentPage,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};