import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import EmployerOnboarding from '../employer/EmployerOnboarding';
import TalentOnboarding from '../talent/TalentOnboarding';
import MentorApply from '../mentor/MentorApply';
import MentorProfile from '../mentor/MentorOnboarding';
import SelectAccountType from '../auth/SelectAccountType';

const OnboardingContainer: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white z-[9999]">
        <div className="w-10 h-10 border-4 border-[#0047CC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const role = user.role?.toLowerCase();
  const step = Number(searchParams.get('step')) || 1;

  switch (role) {
    case 'employer':
      return <EmployerOnboarding />;
    case 'talent':
      return <TalentOnboarding />;
    case 'mentor':
      if (step === 2) {
        return <MentorProfile />;
      }
      return <MentorApply />;
    default:
      return <SelectAccountType />;
  }
};

export default OnboardingContainer;
