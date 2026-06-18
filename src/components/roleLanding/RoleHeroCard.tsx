import Tag from '../common/Tag';
import { SectionTitle } from '../common/Typography';
import RoleTagRow from './RoleTagRow';
import type { PublicRoleLandingData } from '../../types/roleLanding';

const HomeLocationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const BriefcaseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const LocationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

interface RoleHeroCardProps {
  role: Pick<
    PublicRoleLandingData,
    | 'companyName'
    | 'companyLocation'
    | 'companyInitials'
    | 'roleTitle'
    | 'formatLocationLabel'
    | 'compensationLine'
    | 'metaItems'
    | 'primaryTags'
    | 'secondaryTags'
  >;
}

const RoleHeroCard: React.FC<RoleHeroCardProps> = ({ role }) => (
  <div className="bg-white border border-[#E6E6E6] rounded-[10px] px-5 py-6 sm:px-8 mb-5 shadow-sm">
    <div className="flex items-center gap-3.5 mb-4">
      <div className="w-12 h-12 rounded-[10px] bg-[#EBF6FF] border border-[#E6E6E6] flex items-center justify-center text-[11px] font-extrabold text-[#0047CC] shrink-0">
        {role.companyInitials}
      </div>
      <div>
        <div className="text-[16px] font-bold text-[#1A1A1A] mb-[2px]">{role.companyName}</div>
        <div className="text-[13.5px] text-[#808080] font-medium">{role.companyLocation}</div>
      </div>
    </div>

    <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
      <SectionTitle as="h1" className="text-[26px] font-extrabold tracking-tight break-words">
        {role.roleTitle}
      </SectionTitle>
      <Tag
        label={
          <span className="flex items-center gap-1.5">
            <HomeLocationIcon className="w-3.5 h-3.5" />
            {role.formatLocationLabel}
          </span>
        }
        variant="outline"
        className="!rounded-full !px-3.5 !py-1 !text-[13px] !font-semibold shrink-0"
      />
    </div>

    <div className="text-[14.5px] font-medium text-[#808080] mb-5">
      {role.compensationLine}
    </div>

    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2 mb-4">
      {role.metaItems.map((item) => {
        const lower = item.toLowerCase();
        let Icon = BriefcaseIcon;
        if (lower.includes('time') || lower.includes('day') || lower.includes('expire') || lower.includes('hrs')) {
          Icon = ClockIcon;
        } else if (lower.includes('remote') || lower.includes('hybrid') || lower.includes('onsite') || lower.includes('location')) {
          Icon = LocationIcon;
        } else if (lower.includes('position') || lower.includes('user') || lower.includes('level')) {
          Icon = UserIcon;
        }
        return (
          <span key={item} className="text-[13px] text-[#4A4A4A] font-medium flex items-center gap-1.5">
            <Icon className="w-[14px] h-[14px] text-[#808080]" />
            <span>
              {item}
            </span>
          </span>
        );
      })}
    </div>

    <RoleTagRow primaryTags={role.primaryTags} secondaryTags={role.secondaryTags} />
  </div>
);

export default RoleHeroCard;
