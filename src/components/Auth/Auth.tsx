/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthModel, CurrentUserModel } from './AuthModel';
import * as authHelper from './AuthHelper';
import { AccountApi } from '../../api';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  auth: AuthModel | undefined;
  currentUser: CurrentUserModel | undefined;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<CurrentUserModel | undefined>();
  const navigate = useNavigate();

  const login = (token: string) => {
    const newAuth: AuthModel = { api_token: token };
    setAuth(newAuth);
    authHelper.setAuth(newAuth);
  };

  const logout = () => {
    setAuth(undefined);
    setCurrentUser(undefined);
    authHelper.removeAuth();
    navigate('/');
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (auth?.api_token) {
        try {
          const accountApi = new AccountApi();
          const { data } = await accountApi.apiAccountsGetCurrentAccountPost({
            headers: {
              Authorization: `Bearer ${auth.api_token}`,
            }
          });
          if (data?.data) {
            setCurrentUser({
              id: data.data.accountId || '',
              email: data.data.email || '',
              role: data.data.role!
            });
          }
        } catch (error) {
          console.error('Failed to fetch current user:', error);
          logout();
        }
      } else {
        setCurrentUser(undefined);
      }
    };

    fetchCurrentUser();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
