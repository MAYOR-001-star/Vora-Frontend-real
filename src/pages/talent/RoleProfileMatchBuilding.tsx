import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../layout/DashboardLayout';
import RoleApplyContextBanner from '../../components/auth/RoleApplyContextBanner';
import ProfileMatchPulseIcon from '../../components/talent/profileMatch/ProfileMatchPulseIcon';
import ProfileMatchStepRow from '../../components/talent/profileMatch/ProfileMatchStepRow';
import ProfileMatchProgressBar from '../../components/talent/profileMatch/ProfileMatchProgressBar';

import { PROFILE_MATCH_STEPS } from '../../constants/profileMatchBuilding';
import { useProfileMatchProgress } from '../../hooks/useProfileMatchProgress';
import { useAuth } from '../../context/AuthContext';
import { useGetPublicRoleQuery, useGetTalentMatchesQuery } from '../../services/queries/talent';
import { useTalentOnboardingStateQuery } from '../../services/queries/onboarding';
import { getRoleLandingForSlug, mapApiResponseToRoleData } from '../../utils/roleLanding';
import type { PublicRoleLandingData } from '../../types/roleLanding';
import { MOCK_PROFILE_MATCH_SCAN_STRONG_MATCH } from '../../constants/profileMatchWaitlist';
import { MOCK_PROFILE_MATCH_SCAN_BLOCKED } from '../../constants/profileMatchBlocked';
import { getPostMatchPath, resolveProfileMatchScan } from '../../utils/profileMatchResult';

const RoleProfileMatchBuilding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const params = useParams<{ roleSlug: string }>();
  const roleSlug = params.roleSlug || '';
  const firstName =
    (location.state as { firstName?: string } | null)?.firstName || user?.firstName || '';
  const lastName =
    (location.state as { lastName?: string } | null)?.lastName || user?.lastName || '';

  const { data: response, isLoading: isRoleLoading } = useGetPublicRoleQuery(roleSlug || '');
  const { data: stateData } = useTalentOnboardingStateQuery(false, false);
  const { data: matchesResponse, isSuccess: isMatchesSuccess } = useGetTalentMatchesQuery();

  const role: PublicRoleLandingData | null = useMemo(() => {
    if (!roleSlug) return null;
    const apiData = response?.data || response;
    if (!apiData || Object.keys(apiData).length === 0) {
      return getRoleLandingForSlug(roleSlug);
    }
    return mapApiResponseToRoleData(roleSlug, apiData);
  }, [response, roleSlug]);

  const handleComplete = useCallback(async () => {
    let mockScan = MOCK_PROFILE_MATCH_SCAN_STRONG_MATCH;
    
    // Check if the actual API returned a match for this role
    if (isMatchesSuccess && matchesResponse?.data) {
      const allMatches = Array.isArray(matchesResponse.data) ? matchesResponse.data : [];
      const apiData = response?.data || response;
      const targetRoleId = apiData?.id;
      const targetRoleTitle = (apiData?.roleTitle || role?.roleTitle || '').toLowerCase().trim();

      const roleMatch = allMatches.find((m: any) => {
        if (targetRoleId && m.rolePostingId === targetRoleId) return true;
        if (m.rolePosting?.roleTitle && m.rolePosting.roleTitle.toLowerCase().trim() === targetRoleTitle) return true;
        if (m.roleLink === roleSlug || m.role?.roleLink === roleSlug) return true;
        return false;
      });

      // Verify client-side onboarding geographic eligibility (as new onboarding data might not be in backend match yet)
      let clientIsEligible = true;
      const countryIso = stateData?.data?.fields?.countryOfResidence;
      
      if (countryIso && role?.formatLocationLabel) {
        try {
          // Temporarily doing a sync check since we can't easily await import inside synchronous block
          // But wait, handleComplete is an async function!
          const csc = await import('country-state-city');
          const countryName = csc.Country.getCountryByCode(countryIso)?.name;
          
          if (countryName && !role.formatLocationLabel.toLowerCase().includes(countryName.toLowerCase())) {
            const relocate = stateData?.data?.fields?.willingnessToRelocate;
            if (relocate !== 'YES_ANYWHERE') {
               clientIsEligible = false;
            }
          }
        } catch (e) {
          // Ignore errors
        }
      }
      
      // Calculate how many other matches are strong and eligible
      const otherStrongMatches = allMatches.filter((m: any) => 
        m !== roleMatch && 
        (m.overallScore ?? m.score ?? 0) >= 0.8 &&
        (m.geopoliticalEligible ?? m.isEligible ?? true)
      );

      if (roleMatch) {
        // Map backend match format to frontend ProfileMatchScanResult
        const scoreVal = roleMatch.overallScore ?? roleMatch.score ?? 0.8;
        const mappedScore = Math.round(scoreVal * 100);
        const readinessScore = Math.round((roleMatch.dimensionScores?.qualifications ?? 0.8) * 100);
        const backendEligible = roleMatch.geopoliticalEligible ?? roleMatch.isEligible ?? true;
        
        mockScan = {
          originalRoleScore: mappedScore,
          careerReadinessScore: readinessScore,
          matchedRoleCount: otherStrongMatches.length,
          isEligible: backendEligible && clientIsEligible,
          ...roleMatch
        };
      } else {
        // If no match found for this specific role, assume low score, but check if there are other matches
        mockScan = {
          originalRoleScore: 50, // Below threshold
          careerReadinessScore: 50,
          matchedRoleCount: otherStrongMatches.length,
          isEligible: clientIsEligible,
        };
      }
    }

    const matchScan = resolveProfileMatchScan(mockScan);
    let destination = getPostMatchPath(matchScan);
    // Convert destination to dynamic path
    destination = destination.replace('/onboarding/talent/', `/onboarding/talent/${roleSlug}/`);

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
  }, [navigate, firstName, lastName, roleSlug, stateData, role, isMatchesSuccess, matchesResponse]);

  const { statuses, progress, headline, isComplete } = useProfileMatchProgress({
    onComplete: handleComplete,
  });

  if (!role) {
    return null;
  }


  return (
    <DashboardLayout>
      <div className="-mx-4 lg:-mx-8 -mt-6">
        <RoleApplyContextBanner role={role} />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:py-12 mt-6">
        <div className="w-full max-w-[500px] text-center">
          <ProfileMatchPulseIcon />

          <h1 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight mb-2">{headline}</h1>
          <p className="text-sm text-[#808080] leading-relaxed mb-7 max-w-[380px] mx-auto">
            Hang tight, we&apos;re combining your CV and onboarding details into a full profile
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
                status={progress === 100 || isComplete ? 'done' : statuses[index]}
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
