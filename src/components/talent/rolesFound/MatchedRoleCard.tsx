import Button from '../../common/Button';
import Tag from '../../common/Tag';
import { ChevronRightIcon, FileIcon, LocationIcon } from '../../common/Icons';
import MatchPercentBadge from './MatchPercentBadge';
import MatchedRoleEligibilityNote from './MatchedRoleEligibilityNote';
import type { MatchedRoleListing } from '../../../types/talentRolesFound';

interface MatchedRoleCardProps {
  role: MatchedRoleListing;
  onViewJd: (roleId: string) => void;
  onGoToAssessment?: (roleId: string) => void;
}



const MatchedRoleCard: React.FC<MatchedRoleCardProps> = ({ role, onViewJd, onGoToAssessment }) => (
  <article className="bg-white border border-[#E6E6E6] rounded-lg px-5 py-5 mb-3.5 hover:border-[#387DFF] transition-colors">
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
      <div className="flex gap-3 items-start flex-1 min-w-0">
        <div className="w-[42px] h-[42px] rounded-lg bg-[#EBF6FF] border border-[#E6E6E6] flex items-center justify-center text-[9px] font-extrabold text-[#0047CC] shrink-0">
          {role.companyInitials}
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-[#1A1A1A] mb-0.5">{role.roleTitle}</h3>
          <p className="text-[13px] text-[#808080] font-semibold">{role.companyName}</p>
        </div>
      </div>
      <div className="text-left sm:text-right shrink-0">
        <p className="text-base font-extrabold text-[#0047CC] whitespace-nowrap">{role.salaryAmount}</p>
        <p className="text-[11px] text-[#808080]">{role.salaryPeriod}</p>
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-1.5 mb-2 text-xs font-bold text-[#4A4A4A]">
      <span className="inline-flex items-center gap-1">
        <LocationIcon size={11} className="text-[#808080]" />
        {role.locationLine}
      </span>
      <span className="text-[#ADADAD]">·</span>
      <Tag
        variant="blue"
        label={role.formatPill}
      />
      <span className="text-[#ADADAD]">·</span>
      <span className="text-[#808080] font-normal">{role.postedLine}</span>
    </div>

    <div className="flex flex-wrap items-center gap-1.5 mb-2.5 text-xs text-[#808080]">
      <Tag
        variant="blue"
        label={role.contractPill}
      />
      {role.contractMeta.map((item, index) => (
        <span key={item} className="inline-flex items-center gap-1.5">
          {index === 0 ? null : <span className="text-[#ADADAD]">·</span>}
          {item}
        </span>
      ))}
      <span className="text-[#ADADAD]">·</span>
      <span className="inline-flex items-center gap-1">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#808080" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        {role.timezone}
      </span>
    </div>

    <div className="mb-2.5">
      <MatchPercentBadge percent={role.matchPercent} variant={role.matchVariant} />
    </div>

    <MatchedRoleEligibilityNote eligibility={role.eligibility} />

    <div className="flex flex-wrap gap-1.5 mb-3.5">
      {role.tags.map((tag) => (
        <Tag key={tag} label={tag} variant="blue" />
      ))}
    </div>

    <div className="flex flex-col sm:flex-row gap-2.5 sm:justify-end items-stretch sm:items-center pt-3 border-t border-[#F7F7F7]">
      <button
        type="button"
        onClick={() => onViewJd(role.id)}
        className="inline-flex items-center justify-center gap-1.5 px-[18px] py-2.5 bg-white text-[#0047CC] border-[1.5px] border-[#0047CC] rounded-full text-[13px] font-bold cursor-pointer hover:bg-[#EBF6FF] transition-colors"
      >
        <FileIcon size={14} strokeWidth={2.5} />
        View full JD
      </button>
      <Button
        type="button"
        variant="primary"
        size="sm"
        pill
        fullWidth={false}
        onClick={() => onGoToAssessment?.(role.id)}
        className="gap-1.5 sm:!w-auto !font-bold !min-h-0 !py-2.5 !px-5"
      >
        Go to assessment
        <ChevronRightIcon size={13} strokeWidth={2.5} />
      </Button>
    </div>
  </article>
);

export default MatchedRoleCard;
