import type { UpdateRolePostingStepFourRequest } from '../types/rolePosting';

export interface StepFourFormValues {
  preferredWorkingStyle: string[];
  communicationRhythm: string[];
  primaryLanguage: string;
  personalityTraits: string[];
  workEnvironment: string[];
  additionalTeamContext: string;
}

export function buildUpdateRolePostingStepFourBody(
  values: StepFourFormValues,
  options?: { advanceStep?: boolean }
): UpdateRolePostingStepFourRequest {
  return {
    advanceStep: options?.advanceStep ?? false,
    preferredWorkingStyle: values.preferredWorkingStyle,
    communicationRhythm: values.communicationRhythm,
    primaryWorkingLanguage: values.primaryLanguage.trim(),
    personalityTraits: values.personalityTraits,
    workEnvironmentDescriptors: values.workEnvironment,
    teamCultureFreeText: values.additionalTeamContext.trim(),
  };
}
