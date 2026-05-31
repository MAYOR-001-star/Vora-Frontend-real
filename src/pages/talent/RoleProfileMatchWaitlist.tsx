import DashboardLayout from '../../layout/DashboardLayout';
import {
  buildUserDisplayName,
} from '../../components/talent/profileMatch/RoleApplyAppShell';
import ProfileWaitlistHero from '../../components/talent/profileWaitlist/ProfileWaitlistHero';
import RoleAlertPreferencesCard from '../../components/talent/profileWaitlist/RoleAlertPreferencesCard';
import ProfileWaitlistNextSteps from '../../components/talent/profileWaitlist/ProfileWaitlistNextSteps';
import {
  DEFAULT_PROFILE_WAITLIST_SUMMARY,
  MOCK_PROFILE_MATCH_SCAN_STRONG_NO_ROLES,
} from '../../constants/profileMatchWaitlist';
import { useRoleAlertPreferences } from '../../hooks/useRoleAlertPreferences';
import { useAuth } from '../../context/AuthContext';
import { getRoleLandingForSlug } from '../../utils/roleLanding';
import { loadRoleApplySlug } from '../../utils/roleSignup';
import {
  getPostMatchPath,
  resolveProfileMatchScan,
} from '../../utils/profileMatchResult';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RoleProfileMatchWaitlist: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const roleSlug =
    (location.state as { roleSlug?: string } | null)?.roleSlug || loadRoleApplySlug() || 'junior-global-health-researcher';
  const firstName =
    (location.state as { firstName?: string } | null)?.firstName || user?.firstName || '';
  const lastName =
    (location.state as { lastName?: string } | null)?.lastName || user?.lastName || '';
  const matchScan = resolveProfileMatchScan(
    (location.state as { matchScan?: ReturnType<typeof resolveProfileMatchScan> } | null)?.matchScan || MOCK_PROFILE_MATCH_SCAN_STRONG_NO_ROLES,
  );

  const appliedRole = useMemo(
    () => (roleSlug ? getRoleLandingForSlug(roleSlug) : null),
    [roleSlug],
  );

  const summary = useMemo(
    () => ({
      ...DEFAULT_PROFILE_WAITLIST_SUMMARY,
      careerReadinessScore: matchScan.careerReadinessScore,
    }),
    [matchScan.careerReadinessScore],
  );

  const preferencesState = useRoleAlertPreferences();

  useEffect(() => {
    if (!roleSlug) {
      navigate('/onboarding/talent?step=1', { replace: true });
      return;
    }

    const correctPath = getPostMatchPath(matchScan);
    if (correctPath !== '/onboarding/talent/match/waitlist') {
      navigate(correctPath, {
        replace: true,
        state: { firstName, lastName, roleSlug, matchScan, matchScore: matchScan.originalRoleScore },
      });
    }
  }, [roleSlug, matchScan, navigate, firstName, lastName]);

  if (!roleSlug || !appliedRole || getPostMatchPath(matchScan) !== '/onboarding/talent/match/waitlist') {
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
            Your profile has been built and scanned. Here&apos;s where you stand.
          </p>
        </header>
      </div>

      <div className="w-full pb-10">
        <ProfileWaitlistHero summary={summary} />
        <RoleAlertPreferencesCard
          preferences={preferencesState.preferences}
          draft={preferencesState.draft}
          isEditing={preferencesState.isEditing}
          alertSet={preferencesState.alertSet}
          onStartEdit={preferencesState.startEdit}
          onCancelEdit={preferencesState.cancelEdit}
          onSaveEdit={preferencesState.saveEdit}
          onSetAlert={preferencesState.setAlert}
          onDraftChange={preferencesState.updateDraftField}
        />
        <ProfileWaitlistNextSteps />
      </div>
    </DashboardLayout>
  );
};

export default RoleProfileMatchWaitlist;
