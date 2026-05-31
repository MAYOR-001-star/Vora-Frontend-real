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
