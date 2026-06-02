import { ShieldIcon } from '../../common/Icons';
import type { MatchedRoleEligibility } from '../../../types/talentRolesFound';

interface MatchedRoleEligibilityNoteProps {
  eligibility: MatchedRoleEligibility;
}

const MatchedRoleEligibilityNote: React.FC<MatchedRoleEligibilityNoteProps> = ({ eligibility }) => (
  <div className="mb-4 flex gap-2.5 items-start">
    <ShieldIcon size={14} strokeWidth={2.5} className="text-[#4A5568] shrink-0 mt-0.5" />
    <div>
      <p className="text-[13px] font-medium text-[#4A5568] mb-0.5 tracking-tight">{eligibility.title}</p>
      <p className="text-[13px] text-[#718096] leading-relaxed font-normal">{eligibility.body}</p>
    </div>
  </div>
);

export default MatchedRoleEligibilityNote;
