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
    (location.state as { roleSlug?: string } | null)?.roleSlug || loadRoleApplySlug() || '';
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
  }, [roleSlug, careerReadinessPassing, matchScan, navigate, firstName, lastName]);

  if (!roleSlug || !appliedRole || careerReadinessPassing) {
    return null;
  }

  const displayName = buildUserDisplayName(firstName, lastName);
  const welcomeName = firstName.trim() || displayName.split(' ')[0] || 'there';

  const handleGoToAssessment = (_roleId: string) => {
    // Assessment flow TBD — mock no-op for now
  };

  return (
    <DashboardLayout>
      <div className="-mx-4 lg:-mx-8 -mt-6 mb-6">
        <header className="bg-white border-b border-[#E6E6E6] px-4 sm:px-8 py-4 sm:py-[18px]">
          <h1 className="text-xl sm:text-[22px] font-bold text-[#1A1A1A] tracking-tight">
            Welcome, {welcomeName}.
          </h1>
          <p className="text-sm text-[#808080] mt-1">
            Your profile has been built and scanned. Here&apos;s where you stand.
          </p>
        </header>
      </div>

      <div className="w-full">
        <RolesFoundResultBanner summary={summary} />
        <RolesFoundStatsGrid summary={summary} />

        <h2 className="text-lg font-bold text-[#1A1A1A] tracking-tight mb-1">
          Roles your profile matches right now
        </h2>
        <p className="text-sm text-[#808080] mb-[18px]">
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
