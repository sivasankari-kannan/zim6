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
    const savedUser = localStorage.getItem('zim-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    let mockUser: User;

    if (email === 'admin@example.com') {
      mockUser = {
        id: '1',
        name: 'Admin User',
        email,
        role: 'admin',
        avatar: `https://ui-avatars.com/api/?name=Admin+User&background=0EA5E9&color=fff`,
      };
    } else if (email === 'customer@example.com') {
      mockUser = {
        id: '2',
        name: 'John Customer',
        email,
        role: 'customer',
        avatar: `https://ui-avatars.com/api/?name=John+Customer&background=0EA5E9&color=fff`,
      };
    } else {
      mockUser = {
        id: '3',
        name: 'Gym Owner',
        email,
        role: 'client',
        avatar: `https://ui-avatars.com/api/?name=Gym+Owner&background=0EA5E9&color=fff`,
      };
    }

    setUser(mockUser);
    localStorage.setItem('zim-user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      name,
      email,
      role: 'client',
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