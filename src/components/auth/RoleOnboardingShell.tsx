import AuthCenterLogoNav from './AuthCenterLogoNav';
import RoleVerifyContextBanner from './RoleVerifyContextBanner';
import type { PublicRoleLandingData } from '../../types/roleLanding';

interface RoleOnboardingShellProps {
  role: Pick<PublicRoleLandingData, 'roleTitle' | 'companyName' | 'formatLocationLabel'>;
  children: React.ReactNode;
}

/** Centered logo + role apply strip for role-link onboarding steps. */
const RoleOnboardingShell: React.FC<RoleOnboardingShellProps> = ({ role, children }) => (
  <div className="min-h-screen flex flex-col bg-white">
    <AuthCenterLogoNav />
    <RoleVerifyContextBanner role={role} />
    <div className="flex-1">{children}</div>
  </div>
);

export default RoleOnboardingShell;
