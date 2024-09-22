import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './Auth';

export const PrivateRoute: React.FC = () => {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};