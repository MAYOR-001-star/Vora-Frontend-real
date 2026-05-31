import { ShieldIcon } from '../../common/Icons';
import type { MatchedRoleEligibility } from '../../../types/talentRolesFound';

interface MatchedRoleEligibilityNoteProps {
  eligibility: MatchedRoleEligibility;
}

const MatchedRoleEligibilityNote: React.FC<MatchedRoleEligibilityNoteProps> = ({ eligibility }) => (
  <div className="bg-[#EBF6FF] border border-[#387DFF] rounded-md px-3.5 py-2.5 mb-3 flex gap-2 items-start">
    <ShieldIcon size={13} strokeWidth={2.5} className="text-[#0047CC] shrink-0 mt-0.5" />
    <div>
      <p className="text-xs font-extrabold text-[#0047CC] mb-0.5">{eligibility.title}</p>
      <p className="text-xs text-[#182348] leading-relaxed opacity-90">{eligibility.body}</p>
    </div>
  </div>
);

export default MatchedRoleEligibilityNote;
