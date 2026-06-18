export interface RoleOverviewRow {
  label: string;
  value: string;
  valueClassName?: string;
}

export interface RoleEligibilityRow {
  label: string;
  value: string;
  valueClassName?: string;
}

export interface PublicRoleLandingData {
  slug: string;
  companyName: string;
  companyLocation: string;
  companyInitials: string;
  roleTitle: string;
  formatLocationLabel: string;
  compensationLine: string;
  metaItems: string[];
  primaryTags: string[];
  secondaryTags: string[];
  aboutRole: string;
  responsibilities: string[];
  requirements: string[];
  overviewRows: RoleOverviewRow[];
  eligibilityRows: RoleEligibilityRow[];
  eligibilityNote?: string;
  assessmentItems: string[];
}

export interface PublicRoleResponse {
  active: boolean;
  message?: string;
  roleTitle?: string;
  employer?: any;
  compensationSummary?: string;
  roleType?: string;
  locationBadge?: string;
  employmentLevel?: string;
  positionsAvailable?: number;
  tags?: string[];
  about?: string;
  responsibilities?: string[];
  requirements?: string[];
  overview?: {
    salary?: string;
    contract?: string;
    duration?: string;
    level?: string;
    format?: string;
    location?: string;
    positions?: string;
  };
  eligibility?: any;
  posting?: any;
}
