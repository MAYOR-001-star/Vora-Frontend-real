import { CheckIcon } from '../../common/Icons';
import type { MatchPercentVariant } from '../../../types/talentRolesFound';

interface MatchPercentBadgeProps {
  percent: number;
  variant?: MatchPercentVariant;
}

const styles: Record<MatchPercentVariant, string> = {
  green: 'bg-white text-[#4A5568]',
  blue: 'bg-white text-[#4A5568]',
};

const MatchPercentBadge: React.FC<MatchPercentBadgeProps> = ({ percent, variant = 'green' }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-0 py-0.5 text-xs font-medium ${styles[variant]}`}
  >
    <CheckIcon size={14} strokeWidth={3} />
    {percent}% profile match
  </span>
);

export default MatchPercentBadge;
