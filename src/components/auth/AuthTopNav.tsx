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
    <Link to={loginTo}>
      <Button variant="primary" size="sm" pill fullWidth={false} className="gap-1.5">
        Log in
        <ChevronRightIcon size={13} strokeWidth={2.5} />
      </Button>
    </Link>
  </header>
);

export default AuthTopNav;
