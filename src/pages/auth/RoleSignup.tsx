import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import AuthTopNav from '../../components/auth/AuthTopNav';
import RoleApplyContextBanner from '../../components/auth/RoleApplyContextBanner';
import SignupForm from '../../components/auth/SignupForm';
import {
  AuthPageShell,
  AuthPageHeader,
  AuthFormCard,
} from '../../components/auth/AuthPageLayout';
import { useAuth } from '../../context/AuthContext';
import { useFullPageLoading } from '../../hooks/useFullPageLoading';
import { getRoleLandingForSlug } from '../../utils/roleLanding';
const RoleSignup: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const { isLoading: isAuthLoading } = useAuth();
  const role = useMemo(() => getRoleLandingForSlug(slug), [slug]);

  const showFullPage = useFullPageLoading(isAuthLoading, false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AuthTopNav logoTo={slug ? `/role/${slug}` : '/signup'} />
      <RoleApplyContextBanner role={role} />

      <AuthPageShell loading={showFullPage} centered={false} className="flex-1 !min-h-0">
        <AuthPageHeader
          title="Start your journey in global health"
          subtitle="Create your free account. VORA builds your profile from your CV and onboarding details, then instantly checks if you match this role, and hundreds of others."
          className="!mb-7"
        />

        <AuthFormCard className="max-w-[460px]">
          <SignupForm roleSlug={slug} showFooterLogin loginTo="/login" />
        </AuthFormCard>
      </AuthPageShell>
    </div>
  );
};

export default RoleSignup;
