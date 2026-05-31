import type { ScoreBarColor } from '../types/alignmentReview';

export interface ProfileMatchBreakdownItem {
  label: string;
  pct: number;
  barColor: ScoreBarColor;
}

export const PROFILE_MATCH_THRESHOLD = 80;

/** Mock score against the applied role until match API is wired. */
export const MOCK_ORIGINAL_ROLE_MATCH_SCORE = 61;

export const PROFILE_MATCH_RESULT_PATH = '/onboarding/talent/match/result';

export const DEFAULT_PROFILE_MATCH_SCORE = 87;

export const PROFILE_MATCH_BREAKDOWN: ProfileMatchBreakdownItem[] = [
  { label: 'Education', pct: 95, barColor: 'success' },
  { label: 'Research skills', pct: 88, barColor: 'success' },
  { label: 'Technical tools', pct: 76, barColor: 'primary' },
  { label: 'Domain experience', pct: 82, barColor: 'success' },
  { label: 'Communication', pct: 90, barColor: 'success' },
];

export const MATCH_ASSESSMENT_PILLS = ['Psychometric test', 'SJT', 'Video assessment'] as const;

export const MATCH_TOP_PERCENTILE_LABEL = 'You scored in the top 20% of applicants for this role';
