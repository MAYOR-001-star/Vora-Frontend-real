import { BriefcaseIcon } from '../common/Icons';
import type { PublicRoleLandingData } from '../../types/roleLanding';

interface RoleVerifyContextBannerProps {
  role: Pick<PublicRoleLandingData, 'roleTitle' | 'companyName' | 'formatLocationLabel'>;
}

/** Compact centered strip shown on role-link verify-email OTP page. */
const RoleVerifyContextBanner: React.FC<RoleVerifyContextBannerProps> = ({ role }) => (
  <div className="bg-white border-b border-[#BDD9FF] px-4 sm:px-10 py-2.5 flex flex-wrap items-center justify-center gap-2 text-center">
    <BriefcaseIcon size={13} className="text-[#0047CC] shrink-0" strokeWidth={2.5} />
    <span className="text-[11px] font-semibold text-[#182348] uppercase tracking-wide">
      Applying for:
    </span>
    <span className="text-[13px] font-semibold text-[#0047CC]">
      {role.roleTitle} · {role.companyName} · {role.formatLocationLabel}
    </span>
  </div>
);

export default RoleVerifyContextBanner;
