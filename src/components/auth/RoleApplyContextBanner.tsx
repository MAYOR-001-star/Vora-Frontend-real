import { BriefcaseIcon } from '../common/Icons';
import Tag from '../common/Tag';
import type { PublicRoleLandingData } from '../../types/roleLanding';
import { extractSalaryShort } from '../../utils/roleSignup';

interface RoleApplyContextBannerProps {
  role: Pick<
    PublicRoleLandingData,
    'roleTitle' | 'companyName' | 'formatLocationLabel' | 'compensationLine' | 'overviewRows'
  >;
}

const RoleApplyContextBanner: React.FC<RoleApplyContextBannerProps> = ({ role }) => {
  const salaryRow = role.overviewRows.find((row) => row.label === 'Salary');
  const salaryShort = extractSalaryShort(role.compensationLine, salaryRow?.value);
  const locationShort = role.formatLocationLabel.split('·').pop()?.trim() ?? role.formatLocationLabel;

  return (
    <div className="bg-white border-b border-[#BDD9FF] px-4 sm:px-10 py-2.5 flex flex-wrap items-center gap-2.5 sm:gap-3">
      <div
        className="w-8 h-8 rounded-lg bg-[#EBF6FF] border border-[#E6E6E6] flex items-center justify-center shrink-0"
        aria-hidden
      >
        <BriefcaseIcon size={16} className="text-[#0047CC]" strokeWidth={2.5} />
      </div>
      <div className="flex-1 min-w-[180px]">
        <p className="text-[11px] font-semibold text-[#182348] uppercase tracking-wide">
          You&apos;re applying for
        </p>
        <p className="text-sm font-semibold text-[#0047CC] leading-tight">{role.roleTitle}</p>
        <p className="text-xs text-[#808080] font-medium">
          {role.companyName}
          {locationShort ? ` · ${locationShort}` : ''}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1.5 shrink-0 ml-auto">
        <Tag
          label={role.formatLocationLabel}
          variant="blue"
        />
        {salaryShort && (
          <Tag
            label={salaryShort}
            variant="blue"
          />
        )}
      </div>
    </div>
  );
};

export default RoleApplyContextBanner;
