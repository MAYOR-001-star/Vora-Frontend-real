import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import DashboardLayout from './DashboardLayout';
import RoleApplyRestrictedModal from '../components/auth/RoleApplyRestrictedModal';

interface ProtectedDashboardLayoutProps {
  children: React.ReactNode;
}

/** Dashboard shell, only accessible when logged in. */
const ProtectedDashboardLayout: React.FC<ProtectedDashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const state = location.state as { showRoleRestrictedModal?: boolean; accountType?: string } | null;
  const [showModal, setShowModal] = useState(false);
  const [accountType, setAccountType] = useState('EMPLOYER');

  useEffect(() => {
    if (state?.showRoleRestrictedModal) {
      setShowModal(true);
      setAccountType(state.accountType || 'EMPLOYER');
      
      // Clear the state so it doesn't reappear on refresh
      const newState = { ...state };
      delete newState.showRoleRestrictedModal;
      window.history.replaceState({ ...window.history.state, usr: newState }, '');
    }
  }, [state]);

  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
      <RoleApplyRestrictedModal
        open={showModal}
        accountType={accountType}
        onContinue={() => setShowModal(false)}
      />
    </ProtectedRoute>
  );
};

export default ProtectedDashboardLayout;
