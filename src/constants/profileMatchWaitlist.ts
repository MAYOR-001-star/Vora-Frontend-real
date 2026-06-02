import type {
  ProfileMatchScanResult,
  ProfileWaitlistSummary,
  RoleAlertPreferences,
} from '../types/profileMatchWaitlist';
import { PROFILE_MATCH_THRESHOLD } from './profileMatchResult';

export const PROFILE_MATCH_WAITLIST_PATH = '/onboarding/talent/match/waitlist';

export const DEFAULT_ROLE_ALERT_PREFERENCES: RoleAlertPreferences = {
  roleType: 'Research & Analysis',
  experienceLevel: 'Student / Graduate',
  location: 'Open to remote, any region',
  salaryExpectation: '$1,000, $3,000 / month',
  otherPreferences: 'No additional requirements',
};

export const DEFAULT_PROFILE_WAITLIST_SUMMARY: ProfileWaitlistSummary = {
  careerReadinessScore: 80,
  assessmentGrade: 'B1',
  profileStrengthLabel: 'Top 15%',
  strongProfileNote: 'Your profile ranked in the top 15% of all profiles scanned this month',
};

export const PROFILE_WAITLIST_NEXT_STEPS = [
  {
    title: 'Your profile stays live.',
    body: 'VORA holds your complete profile on file, CV, onboarding details, readiness score, ready to match the moment the right role appears.',
  },
  {
    title: 'Instant alert, instant access.',
    body: 'When an employer posts a role that matches your profile at 80%+, you are notified before most people find the listing and can go straight into assessment.',
  },
  {
    title: 'Your score is valid for 90 days.',
    body: 'No need to redo anything. Come back when you get the alert, click start, and VORA picks up exactly where you left off.',
  },
] as const;

/** Mock scan payload until match API is wired. */
export const MOCK_PROFILE_MATCH_SCAN: ProfileMatchScanResult = {
  originalRoleScore: 61,
  matchedRoleCount: 3,
  careerReadinessScore: 71,
};

export const MOCK_PROFILE_MATCH_SCAN_STRONG_NO_ROLES: ProfileMatchScanResult = {
  originalRoleScore: 72,
  matchedRoleCount: 0,
  careerReadinessScore: 80,
};

export const MOCK_PROFILE_MATCH_SCAN_STRONG_MATCH: ProfileMatchScanResult = {
  originalRoleScore: 87,
  matchedRoleCount: 1,
  careerReadinessScore: 80,
};

export type ProfileMatchScanOutcome = 'waitlist' | 'roles_found';

export const isCareerReadinessPassing = (
  scan: ProfileMatchScanResult,
  threshold = PROFILE_MATCH_THRESHOLD,
): boolean => scan.careerReadinessScore >= threshold;

export const resolveProfileMatchScanOutcome = (
  scan: ProfileMatchScanResult,
  threshold = PROFILE_MATCH_THRESHOLD,
): ProfileMatchScanOutcome =>
  isCareerReadinessPassing(scan, threshold) ? 'waitlist' : 'roles_found';
