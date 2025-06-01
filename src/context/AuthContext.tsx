import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const initialAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('zim-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // const login = async (email: string, password: string) => {
  //   // In a real app, this would call an API
  //   // For demo purposes, we'll just simulate a successful login
    
  //   // Simulate API delay
  //   setIsLoading(true);
  //   await new Promise(resolve => setTimeout(resolve, 1000));
    
  //   const mockUser: User = {
  //     id: '1',
  //     name: 'John Doe',
  //     email,
  //     role: 'admin',
  //     avatar: `https://ui-avatars.com/api/?name=John+Doe&background=0EA5E9&color=fff`,
  //   };
    
  //   setUser(mockUser);
  //   localStorage.setItem('zim-user', JSON.stringify(mockUser));
  //   setIsLoading(false);
  // };
  const login = async (email: string, password: string) => {
  setIsLoading(true);
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simple role detection based on email
  const isAdmin = email === 'admin@example.com'; // ✅ Replace with your actual admin email check

  const mockUser: User = {
    id: '1',
    name: isAdmin ? 'Admin User' : 'Client User',
    email,
    role: isAdmin ? 'admin' : 'client',
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(isAdmin ? 'Admin User' : 'Client User')}&background=0EA5E9&color=fff`,
  };

  setUser(mockUser);
  localStorage.setItem('zim-user', JSON.stringify(mockUser));
  setIsLoading(false);
};


  const signup = async (name: string, email: string, password: string) => {
    // In a real app, this would call an API
    // For demo purposes, we'll just simulate a successful signup
    
    // Simulate API delay
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      name,
      email,
      role: 'admin',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0EA5E9&color=fff`,
    };
    
    setUser(mockUser);
    localStorage.setItem('zim-user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('zim-user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};