import { parseRolePostingCurrentStep, WIZARD_STEP_COUNT } from '../constants/jobWizard';

/** Map API `currentStep` (e.g. `"4/5"`) to wizard UI step after save. */
export function resolveWizardStepAfterSave(
  apiCurrentStep: unknown,
  wizardStep: number,
  advanceStep: boolean
): number {
  if (advanceStep && wizardStep === 5) {
    return WIZARD_STEP_COUNT;
  }

  const parsed = parseRolePostingCurrentStep(apiCurrentStep);
  if (parsed != null) {
    return parsed;
  }

  return advanceStep ? Math.min(wizardStep + 1, WIZARD_STEP_COUNT) : wizardStep;
}
