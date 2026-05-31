import {
  AuthPageShell,
  AuthPageHeader,
  AuthFormCard,
} from '../../components/auth/AuthPageLayout';
import SignupForm from '../../components/auth/SignupForm';
import { useAuth } from '../../context/AuthContext';
import { useFullPageLoading } from '../../hooks/useFullPageLoading';

const Signup: React.FC = () => {
  const { isLoading: isAuthLoading } = useAuth();
  const showFullPage = useFullPageLoading(isAuthLoading, false);

  return (
    <AuthPageShell loading={showFullPage}>
      <AuthPageHeader
        title="Start your Journey in Global health"
        subtitle="Join thousands of professionals shaping the future of public health."
      />

      <AuthFormCard>
        <SignupForm />
      </AuthFormCard>
    </AuthPageShell>
  );
};

export default Signup;
