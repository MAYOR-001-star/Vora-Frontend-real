import type { UpdateRolePostingStepThreeRequest } from '../types/rolePosting';

export interface StepThreeFormValues {
  experienceYears: string;
  experienceTypes: string[];
  minQualification: string;
  preferredQualifications: string;
  sectorBackground: string[];
  geographicExperience: string[];
  publicationsRequired: string;
  budgetManagement: string;
  teamManagement: string;
  eligibilityIntPolicy: string;
  eligibilitySecClearance: string;
  preferredProfile: string;
}

export function buildUpdateRolePostingStepThreeBody(
  values: StepThreeFormValues,
  options?: { advanceStep?: boolean }
): UpdateRolePostingStepThreeRequest {
  const body: UpdateRolePostingStepThreeRequest = {
    advanceStep: options?.advanceStep ?? false,
    yearsExperienceRequired: values.experienceYears.trim(),
    typeOfExperience: values.experienceTypes,
    minimumQualification: values.minQualification.trim(),
    sectorBackground: values.sectorBackground,
    internationalTalentPolicy: values.eligibilityIntPolicy.trim(),
  };

  const preferredQualifications = values.preferredQualifications.trim();
  if (preferredQualifications) {
    body.preferredQualifications = preferredQualifications;
  }

  if (values.geographicExperience.length > 0) {
    body.geographicExperience = values.geographicExperience;
  }

  if (values.publicationsRequired.trim()) {
    body.publicationsRequired = values.publicationsRequired.trim();
  }

  if (values.budgetManagement.trim()) {
    body.budgetManagementRequired = values.budgetManagement.trim();
  }

  if (values.teamManagement.trim()) {
    body.teamManagementRequired = values.teamManagement.trim();
  }

  if (values.eligibilitySecClearance.trim()) {
    body.securityClearanceRequirement = values.eligibilitySecClearance.trim();
  }

  const preferredProfile = values.preferredProfile.trim();
  if (preferredProfile) {
    body.preferredTalentProfile = preferredProfile;
  }

  return body;
}
