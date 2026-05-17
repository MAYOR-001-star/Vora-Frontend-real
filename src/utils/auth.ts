import type { User } from '../services/queries/auth/types';

export function routeAfterAuth(user: User): string {
  const isEmailVerified = user.isEmailVerified ?? true;
  if (!isEmailVerified) return '/verify-email';

  const isOnboardingComplete = user.isOnboardingComplete ?? (!!user.firstName);
  if (!isOnboardingComplete) {
    const onboardingStep = user.onboardingStep ?? 0;
    const nextStep = onboardingStep + 1;
    return `/onboarding?step=${nextStep}`;
  }
  return '/dashboard';
}
