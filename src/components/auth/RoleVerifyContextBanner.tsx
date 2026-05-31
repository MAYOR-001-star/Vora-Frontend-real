import { BriefcaseIcon } from '../common/Icons';
import Tag from '../common/Tag';
import type { PublicRoleLandingData } from '../../types/roleLanding';

interface RoleVerifyContextBannerProps {
  role: Pick<PublicRoleLandingData, 'roleTitle' | 'companyName' | 'formatLocationLabel'>;
}

/** Compact centered strip shown on role-link verify-email OTP page. */
const RoleVerifyContextBanner: React.FC<RoleVerifyContextBannerProps> = ({ role }) => (
  <div className="bg-[#EBF6FF] border-b border-[#BDD9FF] px-4 sm:px-10 py-2.5 flex flex-wrap items-center justify-center gap-2 text-center">
    <BriefcaseIcon size={13} className="text-[#387DFF] shrink-0" strokeWidth={2.5} />
    <span className="text-[11px] font-semibold text-[#387DFF] uppercase tracking-wide">
      Applying for:
    </span>
    <span className="text-[13px] font-semibold text-[#182348]">
      {role.roleTitle} · {role.companyName}
    </span>
    <Tag
      label={role.formatLocationLabel}
      variant="blue"
      className="!bg-[#344DA1] !text-white !text-[11px] !font-medium !px-2.5 !py-0.5 !rounded-full"
    />
  </div>
);

export default RoleVerifyContextBanner;
