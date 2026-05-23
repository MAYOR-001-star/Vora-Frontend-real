import React from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

interface EmployerRouteProps {
  children: React.ReactNode;
}

/**
 * Restricts access to employer-only flows (post job, vault, payments, etc.).
 */
const EmployerRoute: React.FC<EmployerRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role?.toLowerCase() !== 'employer') {
    toast.error('Only employer accounts can access this page.');
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default EmployerRoute;
