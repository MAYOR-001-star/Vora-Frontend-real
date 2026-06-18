import { Link } from 'react-router-dom';
import Button from '../common/Button';
import VoraLogo from '../common/VoraLogo';
import { ChevronRightIcon } from '../common/Icons';

interface AuthTopNavProps {
  logoTo?: string;
  loginTo?: string;
}

const AuthTopNav: React.FC<AuthTopNavProps> = ({ logoTo = '/signup', loginTo = '/login' }) => (
  <header className="sticky top-0 z-[100] bg-white border-b border-[#E6E6E6] px-4 sm:px-10 min-h-[58px] flex items-center justify-between">
    <VoraLogo to={logoTo} size="md" />
    {loginTo && (
      <div className="text-[13px] sm:text-sm text-[#808080] font-medium">
        Already have an account?{' '}
        <Link to={loginTo} className="text-[#60A5FA] hover:text-[#0047CC] transition-colors duration-200">
          Log in
        </Link>
      </div>
    )}
  </header>
);

export default AuthTopNav;
