import { BriefcaseIcon } from '../../common/Icons';
import Tag from '../../common/Tag';
import type { PublicRoleLandingData } from '../../../types/roleLanding';

interface RoleApplyContextStripProps {
  role: Pick<PublicRoleLandingData, 'roleTitle' | 'formatLocationLabel'>;
}

/** Compact left-aligned role strip for CV upload and similar steps. */
const RoleApplyContextStrip: React.FC<RoleApplyContextStripProps> = ({ role }) => (
  <div className="bg-[#EBF6FF] border-b border-[#BDD9FF] px-4 sm:px-6 py-2 flex flex-wrap items-center gap-2 shrink-0">
    <BriefcaseIcon size={12} className="text-[#387DFF] shrink-0" strokeWidth={2.5} />
    <span className="text-[11px] font-semibold text-[#387DFF] uppercase tracking-wide">
      Applying for:
    </span>
    <span className="text-xs font-semibold text-[#182348]">{role.roleTitle}</span>
    <Tag
      label={role.formatLocationLabel}
      variant="blue"
      className="!bg-[#344DA1] !text-white !text-[11px] !font-medium !px-2.5 !py-0.5 !rounded-full ml-auto shrink-0"
    />
  </div>
);

export default RoleApplyContextStrip;
