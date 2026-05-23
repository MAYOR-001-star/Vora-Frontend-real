import type { UpdateRolePostingStepTwoRequest } from '../types/rolePosting';

export interface StepTwoFormValues {
  roleGoal: string;
  coreResponsibilities: string;
  technicalSkills: string[];
  tools: string[];
  languages: string[];
  preAssessments: string[];
}

export function buildUpdateRolePostingStepTwoBody(
  values: StepTwoFormValues,
  options?: { advanceStep?: boolean }
): UpdateRolePostingStepTwoRequest {
  const body: UpdateRolePostingStepTwoRequest = {
    advanceStep: options?.advanceStep ?? false,
    roleGoal: values.roleGoal.trim(),
    coreResponsibilities: values.coreResponsibilities.trim(),
    technicalSkills: values.technicalSkills,
    toolsRequired: values.tools,
    languageRequirements: values.languages,
  };

  body.preAssessmentDocumentTypes = values.preAssessments;

  return body;
}
