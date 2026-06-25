import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTalentOnboardingStateQuery } from '../../services/queries/onboarding';
import FullPageSpinner from '../common/FullPageSpinner';

const RoleApplyRoute: React.FC = () => {
  const { roleSlug } = useParams<{ roleSlug: string }>();
  const { user } = useAuth();

  // If user is not authenticated, they shouldn't be here (App.tsx already has some protection, but let's be sure)
  if (!user) {
    return <Navigate to={`/role/${roleSlug}/login`} replace />;
  }

  // Fetch onboarding state to verify CV parse status
  const { data: stateData, isLoading } = useTalentOnboardingStateQuery(true);

  if (isLoading) {
    return <FullPageSpinner />;
  }

  const step = stateData?.data?.step || 0;
  const onboardingCompleted = stateData?.data?.onboardingCompleted === true;
  const activeCvStatus = stateData?.data?.activeCv?.parseStatus || stateData?.data?.applyContext?.parseStatus;

  // Step 1: Ensure user has completed basic demographic onboarding (Steps 1 & 2)
  if (!onboardingCompleted && step < 2) {
    // If they haven't finished basic onboarding, bump them back to the general onboarding screen
    return <Navigate to={`/onboarding/talent?step=${step + 1}`} replace />;
  }

  // We expose the activeCvStatus via Outlet context so child routes can do additional filtering if needed.
  return <Outlet context={{ activeCvStatus, roleSlug }} />;
};

export default RoleApplyRoute;
