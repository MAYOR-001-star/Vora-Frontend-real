import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { GoogleIcon } from '../common/Icons';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';
import { getGoogleClientId } from '../../lib/googleAuth';

interface GoogleSignInButtonProps {
  label?: string;
  disabled?: boolean;
  /** Role-link signup: navigate to OTP (no Google API until new endpoint is provided). */
  roleSlug?: string;
  email?: string;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  label = 'Sign in with Google',
  disabled = false,
  roleSlug,
  email,
}) => {
  const navigate = useNavigate();
  const { handleGoogleSignIn, isGoogleLoading } = useGoogleAuth();
  const isConfigured = !!getGoogleClientId();
  const isRoleSignupMock = Boolean(roleSlug);

  const handleClick = () => {
    if (isRoleSignupMock) {
      navigate('/verify-email', {
        state: {
          email: email?.trim() || 'test@vora.com',
          accountType: 'Talent',
          roleSlug,
          mockAuth: true,
        },
      });
      return;
    }
    handleGoogleSignIn();
  };

  return (
    <Button
      variant="social"
      type="button"
      className="min-w-0"
      onClick={handleClick}
      disabled={disabled || isGoogleLoading || (!isRoleSignupMock && !isConfigured)}
      isLoading={isGoogleLoading && !isRoleSignupMock}
    >
      <GoogleIcon />
      <span className="truncate">{label}</span>
    </Button>
  );
};

export default GoogleSignInButton;
