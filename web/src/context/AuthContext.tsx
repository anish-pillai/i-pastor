import React, { createContext, useContext, useState } from 'react';
import { googleLogout } from '@react-oauth/google';

type AuthContextType = {
  isAuthenticated: boolean;
  authToken: string | null;
  userInfo: any;
  login: (token: string) => void;
  logout: () => void;
  setUserInfo: (info: any) => void;
};

const TOKEN_LABEL = 'jwt';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem(TOKEN_LABEL)
  );
  const [userInfo, setUserInfo] = useState<any>(null);
  const isAuthenticated = !!authToken;

  const login = (token: string) => {
    localStorage.setItem(TOKEN_LABEL, token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_LABEL);
    googleLogout();
    setAuthToken(null);
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        userInfo,
        login,
        logout,
        setUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
