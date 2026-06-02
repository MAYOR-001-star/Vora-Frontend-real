import { BriefcaseIcon } from '../../common/Icons';
import type { PublicRoleLandingData } from '../../../types/roleLanding';

interface RoleApplyContextStripProps {
  role: Pick<PublicRoleLandingData, 'roleTitle' | 'formatLocationLabel'>;
}

/** Compact left-aligned role strip for CV upload and similar steps. */
const RoleApplyContextStrip: React.FC<RoleApplyContextStripProps> = ({ role }) => (
  <div className="bg-white border-b border-[#BDD9FF] px-4 sm:px-6 py-2 flex flex-wrap items-center gap-2 shrink-0">
    <BriefcaseIcon size={12} className="text-[#0047CC] shrink-0" strokeWidth={2.5} />
    <span className="text-[11px] font-semibold text-[#182348] uppercase tracking-wide">
      Applying for:
    </span>
    <span className="text-xs font-semibold text-[#0047CC]">
      {role.roleTitle} · {role.formatLocationLabel}
    </span>
  </div>
);

export default RoleApplyContextStrip;
