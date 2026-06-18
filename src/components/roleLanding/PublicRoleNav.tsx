import { Link } from 'react-router-dom';
import Button from '../common/Button';
import VoraLogo from '../common/VoraLogo';
import { ChevronRightIcon } from '../common/Icons';
import { getRoleSignupPath } from '../../utils/roleSignup';

interface PublicRoleNavProps {
  roleSlug: string;
}

const PublicRoleNav: React.FC<PublicRoleNavProps> = ({ roleSlug }) => (
  <header className="sticky top-0 z-[100] bg-white border-b border-[#E6E6E6] px-4 sm:px-10 min-h-[58px] flex items-center justify-between">
    <VoraLogo to={`/role/${roleSlug}`} size="md" />
    <Link to="/signup">
      <Button variant="primary-outline" size="sm" pill fullWidth={false}>
        Sign up
      </Button>
    </Link>
  </header>
);

export default PublicRoleNav;
