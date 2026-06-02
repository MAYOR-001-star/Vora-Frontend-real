import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layout/DashboardLayout';
import {
  buildUserDisplayName,
} from '../../components/talent/profileMatch/RoleApplyAppShell';
import RolesFoundResultBanner from '../../components/talent/rolesFound/RolesFoundResultBanner';
import RolesFoundStatsGrid from '../../components/talent/rolesFound/RolesFoundStatsGrid';
import MatchedRoleCard from '../../components/talent/rolesFound/MatchedRoleCard';
import MatchedRoleJdModal from '../../components/talent/rolesFound/MatchedRoleJdModal';
import {
  DEFAULT_ROLES_FOUND_SUMMARY,
  MOCK_MATCHED_ROLES,
} from '../../constants/talentRolesFound';
import { isCareerReadinessPassing } from '../../constants/profileMatchWaitlist';
import { useAuth } from '../../context/AuthContext';
import { getRoleLandingForSlug } from '../../utils/roleLanding';
import { loadRoleApplySlug } from '../../utils/roleSignup';
import {
  getPostMatchPath,
  resolveProfileMatchScan,
} from '../../utils/profileMatchResult';

const RoleProfileRolesFound: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  const roleSlug =
    (location.state as { roleSlug?: string } | null)?.roleSlug || loadRoleApplySlug() || 'junior-global-health-researcher';
  const firstName =
    (location.state as { firstName?: string } | null)?.firstName || user?.firstName || '';
  const lastName =
    (location.state as { lastName?: string } | null)?.lastName || user?.lastName || '';
  const matchScan = resolveProfileMatchScan(
    (location.state as { matchScan?: ReturnType<typeof resolveProfileMatchScan> } | null)?.matchScan,
  );
  const careerReadinessPassing = isCareerReadinessPassing(matchScan);

  const appliedRole = useMemo(
    () => (roleSlug ? getRoleLandingForSlug(roleSlug) : null),
    [roleSlug],
  );

  const summary = useMemo(
    () => ({
      ...DEFAULT_ROLES_FOUND_SUMMARY,
      originalRoleTitle: appliedRole?.roleTitle ?? DEFAULT_ROLES_FOUND_SUMMARY.originalRoleTitle,
      originalScore: matchScan.originalRoleScore,
    }),
    [appliedRole, matchScan.originalRoleScore],
  );

  const selectedRole = useMemo(
    () => MOCK_MATCHED_ROLES.find((role) => role.id === selectedRoleId) ?? null,
    [selectedRoleId],
  );

  useEffect(() => {
    // UI DEV: Commenting out redirects so pages can be accessed directly
    /*
    if (!roleSlug) {
      navigate('/onboarding/talent?step=1', { replace: true });
      return;
    }

    if (careerReadinessPassing) {
      navigate(getPostMatchPath(matchScan), {
        replace: true,
        state: { firstName, lastName, roleSlug, matchScan, matchScore: matchScan.originalRoleScore },
      });
    }
    */
  }, [roleSlug, careerReadinessPassing, matchScan, navigate, firstName, lastName]);

  if (!roleSlug || !appliedRole) {
    return null;
  }

  const displayName = buildUserDisplayName(firstName, lastName);
  const welcomeName = firstName.trim() || displayName.split(' ')[0] || 'there';

  const handleGoToAssessment = (_roleId: string) => {
    // Assessment flow TBD, mock no-op for now
  };

  return (
    <DashboardLayout>
      <div className="-mx-4 lg:-mx-8 -mt-6 mb-6">
        <header className="bg-transparent px-4 sm:px-8 pt-4 pb-2 sm:pt-6 sm:pb-3">
          <h1 className="text-[24px] sm:text-[28px] font-extrabold text-[#0D1B36] tracking-tight">
            Welcome, {welcomeName}.
          </h1>
          <p className="text-[15px] text-[#4A5568] mt-1.5 font-medium">
            Your profile has been built and scanned. Here&apos;s where you stand.
          </p>
        </header>
      </div>

      <div className="w-full">
        <RolesFoundResultBanner summary={summary} />
        <RolesFoundStatsGrid summary={summary} />

        <h2 className="text-[20px] font-extrabold text-[#0D1B36] tracking-tight mb-1.5">
          Roles your profile matches right now
        </h2>
        <p className="text-[14px] font-medium text-[#4A5568] mb-6">
          Your profile matched these at {summary.matchThreshold}%+. View the JD, then go straight
          to assessment.
        </p>

        {MOCK_MATCHED_ROLES.map((role) => (
          <MatchedRoleCard
            key={role.id}
            role={role}
            onViewJd={setSelectedRoleId}
            onGoToAssessment={handleGoToAssessment}
          />
        ))}
      </div>

      <MatchedRoleJdModal
        role={selectedRole}
        open={Boolean(selectedRoleId)}
        onClose={() => setSelectedRoleId(null)}
        onGoToAssessment={(roleId) => {
          setSelectedRoleId(null);
          handleGoToAssessment(roleId);
        }}
      />
    </DashboardLayout>
  );
};

export default RoleProfileRolesFound;
