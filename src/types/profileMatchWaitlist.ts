export interface RoleAlertPreferences {
  roleType: string;
  experienceLevel: string;
  location: string;
  salaryExpectation: string;
  otherPreferences: string;
}

export interface ProfileWaitlistSummary {
  careerReadinessScore: number;
  assessmentGrade: string;
  profileStrengthLabel: string;
  strongProfileNote: string;
}

export interface ProfileMatchScanResult {
  originalRoleScore: number;
  matchedRoleCount: number;
  careerReadinessScore: number;
  isEligible?: boolean;
}

export type ProfileMatchScanOutcome = 'waitlist' | 'roles_found';
