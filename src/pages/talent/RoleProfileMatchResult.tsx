import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layout/DashboardLayout';
import { buildUserDisplayName } from '../../components/talent/profileMatch/RoleApplyAppShell';
import MatchResultHero from '../../components/talent/profileMatchResult/MatchResultHero';
import MatchResultEligibility from '../../components/talent/profileMatchResult/MatchResultEligibility';
import MatchResultBreakdown from '../../components/talent/profileMatchResult/MatchResultBreakdown';
import MatchResultAssessmentCTA from '../../components/talent/profileMatchResult/MatchResultAssessmentCTA';
import { useAuth } from '../../context/AuthContext';
import { getRoleLandingForSlug } from '../../utils/roleLanding';
import { loadRoleApplySlug } from '../../utils/roleSignup';
import { resolveProfileMatchScan } from '../../utils/profileMatchResult';
import { MOCK_PROFILE_MATCH_SCAN_STRONG_MATCH } from '../../constants/profileMatchWaitlist';

const RoleProfileMatchResult: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const roleSlug =
    (location.state as { roleSlug?: string } | null)?.roleSlug || loadRoleApplySlug() || 'junior-global-health-researcher';
  const firstName =
    (location.state as { firstName?: string } | null)?.firstName || user?.firstName || '';
  const lastName =
    (location.state as { lastName?: string } | null)?.lastName || user?.lastName || '';
  
  // Use strong match mock by default for demonstration purposes
  const matchScan = resolveProfileMatchScan(
    (location.state as { matchScan?: ReturnType<typeof resolveProfileMatchScan> } | null)?.matchScan || MOCK_PROFILE_MATCH_SCAN_STRONG_MATCH,
  );

  const appliedRole = useMemo(
    () => (roleSlug ? getRoleLandingForSlug(roleSlug) : null),
    [roleSlug],
  );

  useEffect(() => {
    /*
    if (!roleSlug) {
      navigate('/onboarding/talent?step=1', { replace: true });
      return;
    }

    const correctPath = getPostMatchPath(matchScan);
    if (correctPath !== '/onboarding/talent/match/result') {
      navigate(correctPath, {
        replace: true,
        state: { firstName, lastName, roleSlug, matchScan, matchScore: matchScan.originalRoleScore },
      });
    }
    */
  }, [roleSlug, matchScan, navigate, firstName, lastName]);

  if (!roleSlug || !appliedRole) {
    return null;
  }

  const displayName = buildUserDisplayName(firstName, lastName);
  const welcomeName = firstName.trim() || displayName.split(' ')[0] || 'there';

  return (
    <DashboardLayout>
      <div className="-mx-4 lg:-mx-8 -mt-6 mb-6">
        <header className="bg-white border-b border-[#E6E6E6] px-4 sm:px-8 py-4 sm:py-[18px]">
          <h1 className="text-xl sm:text-[22px] font-bold text-[#1A1A1A] tracking-tight">
            Welcome, {welcomeName}.
          </h1>
          <p className="text-sm text-[#808080] mt-1">
            Your profile has been built, scanned and eligibility verified. Here is your result.
          </p>
        </header>
      </div>

      <div className="w-full pb-10">
        <MatchResultHero score={matchScan.originalRoleScore} role={appliedRole} />
        <MatchResultEligibility />
        <MatchResultBreakdown />
        <MatchResultAssessmentCTA />
      </div>
    </DashboardLayout>
  );
};

export default RoleProfileMatchResult;
