
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User } from '../types';
import * as api from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  googleLogin: (idToken: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async (): Promise<void> => {
    if (token) {
      try {
        setLoading(true);
        const userData = await api.getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user", error);
        logout();
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchUser();
  }, [token]);

  const login = async (email: string, pass: string) => {
    const { token: newToken, user: newUser } = await api.loginUser(email, pass);
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const googleLogin = async (idToken: string) => {
    const { token: newToken, user: newUser } = await api.googleAuth(idToken);
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const register = async (name: string, email: string, pass: string) => {
    const { token: newToken, user: newUser } = await api.registerUser(name, email, pass);
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };
  
  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated, login, googleLogin, register, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};