import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import EmployerOnboarding from '../employer/EmployerOnboarding';
import TalentOnboarding from '../talent/TalentOnboarding';
import SelectAccountType from '../auth/SelectAccountType';
import {
  getMentorOnboardingRoute,
  type MentorOnboardingUserFields,
} from '../../utils/mentorOnboarding';
import FullPageSpinner from '../../components/common/FullPageSpinner';

const OnboardingContainer: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  if (!user) {
    return <FullPageSpinner />;
  }

  const role = user.role?.toLowerCase();
  const step = Number(searchParams.get('step')) || 1;

  switch (role) {
    case 'employer':
      return <EmployerOnboarding />;
    case 'talent':
      return <TalentOnboarding />;
    case 'mentor':
      const mentorUser: MentorOnboardingUserFields = {
        onboardingStep: user.onboardingStep,
        onboardingCompleted: user.onboardingCompleted,
        isOnboardingComplete: user.isOnboardingComplete,
      };
      return (
        <Navigate
          to={getMentorOnboardingRoute(mentorUser.onboardingStep ?? step, mentorUser)}
          replace
        />
      );
    default:
      return <SelectAccountType />;
  }
};

export default OnboardingContainer;
