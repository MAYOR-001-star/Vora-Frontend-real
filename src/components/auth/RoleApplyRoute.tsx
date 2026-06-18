import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTalentOnboardingStateQuery } from '../../services/queries/onboarding';

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-[#0047CC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
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
