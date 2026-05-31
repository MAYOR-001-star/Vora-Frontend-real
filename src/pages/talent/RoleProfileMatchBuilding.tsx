import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layout/DashboardLayout';
import RoleVerifyContextBanner from '../../components/auth/RoleVerifyContextBanner';
import ProfileMatchPulseIcon from '../../components/talent/profileMatch/ProfileMatchPulseIcon';
import ProfileMatchStepRow from '../../components/talent/profileMatch/ProfileMatchStepRow';
import ProfileMatchProgressBar from '../../components/talent/profileMatch/ProfileMatchProgressBar';

import { PROFILE_MATCH_STEPS } from '../../constants/profileMatchBuilding';
import { useProfileMatchProgress } from '../../hooks/useProfileMatchProgress';
import { useAuth } from '../../context/AuthContext';
import { getRoleLandingForSlug } from '../../utils/roleLanding';
import { loadRoleApplySlug } from '../../utils/roleSignup';
import { MOCK_PROFILE_MATCH_SCAN_BLOCKED } from '../../constants/profileMatchBlocked';
import { getPostMatchPath, resolveProfileMatchScan } from '../../utils/profileMatchResult';

const RoleProfileMatchBuilding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const roleSlug =
    (location.state as { roleSlug?: string } | null)?.roleSlug || loadRoleApplySlug() || '';
  const firstName =
    (location.state as { firstName?: string } | null)?.firstName || user?.firstName || '';
  const lastName =
    (location.state as { lastName?: string } | null)?.lastName || user?.lastName || '';

  const role = useMemo(
    () => (roleSlug ? getRoleLandingForSlug(roleSlug) : null),
    [roleSlug],
  );

  const handleComplete = useCallback(() => {
    const matchScan = resolveProfileMatchScan(MOCK_PROFILE_MATCH_SCAN_BLOCKED);
    const destination = getPostMatchPath(matchScan);

    window.setTimeout(() => {
      navigate(destination, {
        state: {
          firstName,
          lastName,
          roleSlug,
          matchScan,
          matchScore: matchScan.originalRoleScore,
        },
      });
    }, 1500);
  }, [navigate, firstName, lastName, roleSlug]);

  const { statuses, progress, headline } = useProfileMatchProgress({
    onComplete: handleComplete,
  });

  useEffect(() => {
    if (!roleSlug) {
      navigate('/onboarding/talent?step=1', { replace: true });
    }
  }, [roleSlug, navigate]);

  if (!roleSlug || !role) {
    return null;
  }


  return (
    <DashboardLayout>
      <div className="-mx-4 lg:-mx-8 -mt-6">
        <RoleVerifyContextBanner role={role} />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:py-12 mt-6">
        <div className="w-full max-w-[500px] text-center">
          <ProfileMatchPulseIcon />

          <h1 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight mb-2">{headline}</h1>
          <p className="text-sm text-[#808080] leading-relaxed mb-7 max-w-[380px] mx-auto">
            Hang tight — we&apos;re combining your CV and onboarding details into a full profile
            and checking your match for{' '}
            <strong className="text-[#0047CC] font-semibold">{role.roleTitle}</strong> and 200+
            other live roles simultaneously.
          </p>

          <div className="text-left mb-7">
            {PROFILE_MATCH_STEPS.map((step, index) => (
              <ProfileMatchStepRow
                key={step.id}
                title={step.title}
                subtitle={step.subtitle}
                status={statuses[index]}
                isLast={index === PROFILE_MATCH_STEPS.length - 1}
              />
            ))}
          </div>

          <ProfileMatchProgressBar progress={progress} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RoleProfileMatchBuilding;
