import type { PublicRoleLandingData } from '../types/roleLanding';
import type { ProfileMatchScanResult } from '../types/profileMatchWaitlist';
import {
  MOCK_PROFILE_MATCH_SCAN,
  PROFILE_MATCH_WAITLIST_PATH,
} from '../constants/profileMatchWaitlist';
import { PROFILE_MATCH_THRESHOLD, PROFILE_MATCH_RESULT_PATH } from '../constants/profileMatchResult';
import { ROLES_FOUND_PATH } from '../constants/talentRolesFound';

export const PROFILE_MATCH_BLOCKED_PATH = '/onboarding/talent/match/blocked';
export { PROFILE_MATCH_WAITLIST_PATH };

export const isProfileMatchPassing = (score: number, threshold = PROFILE_MATCH_THRESHOLD): boolean =>
  score >= threshold;

export const resolveProfileMatchScan = (
  scan?: Partial<ProfileMatchScanResult> | null,
): ProfileMatchScanResult => ({
  ...MOCK_PROFILE_MATCH_SCAN,
  ...scan,
});

/**
 * If original role score >= 80% -> match confirmed
 * Else if alternate roles found -> alternate roles found
 * Else -> waitlist
 */
export const getPostMatchPath = (scan: ProfileMatchScanResult): string => {
  if (scan.originalRoleScore >= PROFILE_MATCH_THRESHOLD) {
    if (scan.isEligible === false) {
      return PROFILE_MATCH_BLOCKED_PATH;
    }
    return PROFILE_MATCH_RESULT_PATH;
  }
  if (scan.matchedRoleCount > 0) {
    return ROLES_FOUND_PATH;
  }
  return PROFILE_MATCH_WAITLIST_PATH;
};

export const resolveOriginalRoleMatchScore = (
  score?: number | null,
  scan?: Partial<ProfileMatchScanResult> | null,
): number => score ?? resolveProfileMatchScan(scan).originalRoleScore;

export const buildMatchConfirmedTitle = (
  role: Pick<PublicRoleLandingData, 'companyName' | 'overviewRows'>,
): string => {
  const location =
    role.overviewRows.find((row) => row.label === 'Location')?.value ?? role.companyName;
  return `${role.companyName} · ${location}`;
};

export const buildMatchConfirmedSubtitle = (
  role: Pick<PublicRoleLandingData, 'compensationLine' | 'metaItems' | 'overviewRows'>,
): string => {
  const positionsRow = role.overviewRows.find((row) => row.label === 'Positions')?.value;
  const positions = positionsRow
    ? positionsRow.includes('position')
      ? positionsRow
      : positionsRow.replace(/^(\d+)/, '$1 positions')
    : '2 positions available';
  const salary =
    role.overviewRows.find((row) => row.label === 'Salary')?.value ??
    role.compensationLine.split('·')[0]?.trim() ??
    '$1,800/month';
  const expiry =
    role.metaItems.find((item) => item.includes('Expires')) ?? 'Expires in 28 days';

  return `${positions} · ${salary} · ${expiry}`;
};
