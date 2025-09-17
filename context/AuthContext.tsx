import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { User } from "../types";
import { 
  getUserProfile, 
  loginUser, 
  googleAuth, 
  sendOtpApi, 
  verifyOtpApi 
} from "../services/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  isProfileComplete: boolean;
  login: (email: string, pass: string) => Promise<void>;
  googleLogin: (idToken: string) => Promise<void>;
  sendOtp: (data: { name: string; email: string; password: string; }) => Promise<void>;
  verifyOtp: (data: { email: string; otp: string }) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async (): Promise<void> => {
    if (token) {
      try {
        setLoading(true);
        const userData = await getUserProfile();
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

  useEffect(() => {
    fetchUser();
  }, [token]);

  const login = async (email: string, pass: string) => {
    try {
      setLoading(true);
      const { token: newToken, user: newUser } = await loginUser(email, pass);
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(newUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (idToken: string) => {
    try {
      setLoading(true);
      const { token: newToken, user: newUser } = await googleAuth(idToken);
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(newUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async (data: { name: string; email: string; password: string; }) => {
    try {
      setLoading(true);
      await sendOtpApi(data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (data: { email: string; otp: string }) => {
    try {
      setLoading(true);
      const { token: newToken, user: newUser } = await verifyOtpApi(data);
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(newUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!token && !!user;

  // 🔹 Only frontend check → mark profile as complete if these exist
  const isProfileComplete =
    !!user?.name &&
    !!user?.email &&
    !!user?.skills?.length &&
    !!user?.phone &&
    !!user?.location &&
    !!user?.education?.length &&
    !!user?.resume;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        isProfileComplete,
        login,
        googleLogin,
        sendOtp,
        verifyOtp,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
