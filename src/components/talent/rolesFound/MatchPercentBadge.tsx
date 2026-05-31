import { CheckIcon } from '../../common/Icons';
import type { MatchPercentVariant } from '../../../types/talentRolesFound';

interface MatchPercentBadgeProps {
  percent: number;
  variant?: MatchPercentVariant;
}

const styles: Record<MatchPercentVariant, string> = {
  green: 'bg-[#EBF6FF] border-[#387DFF] text-[#0047CC]',
  blue: 'bg-[#EBF6FF] border-[#387DFF] text-[#182348]',
};

const MatchPercentBadge: React.FC<MatchPercentBadgeProps> = ({ percent, variant = 'green' }) => (
  <span
    className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-[13px] font-bold ${styles[variant]}`}
  >
    <CheckIcon size={12} strokeWidth={2.5} />
    {percent}% profile match
  </span>
);

export default MatchPercentBadge;
