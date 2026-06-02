import Tag from '../common/Tag';
import { SectionTitle } from '../common/Typography';
import RoleTagRow from './RoleTagRow';
import type { PublicRoleLandingData } from '../../types/roleLanding';

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
  <div className="bg-white border border-[#E6E6E6] rounded-[10px] px-5 py-6 sm:px-8 mb-5">
    <div className="flex items-center gap-3.5 mb-4">
      <div className="w-12 h-12 rounded-[10px] bg-[#EBF6FF] border border-[#E6E6E6] flex items-center justify-center text-[10px] font-semibold text-[#0047CC] shrink-0">
        {role.companyInitials}
      </div>
      <div>
        <div className="text-[15px] font-semibold text-[#1A1A1A]">{role.companyName}</div>
        <div className="text-[13px] text-[#808080] font-medium">{role.companyLocation}</div>
      </div>
    </div>

    <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <SectionTitle as="h1" className="text-2xl sm:text-[28px]">
        {role.roleTitle}
      </SectionTitle>
      <Tag
        label={role.compensationLine}
        variant="blue"
        className="!rounded-full !px-3.5 !py-1 !text-xs !font-medium shrink-0"
      />
    </div>

    <div className="flex flex-wrap gap-4 mt-3.5">
      {role.metaItems.map((item) => (
        <span key={item} className="text-[13px] text-[#4A4A4A] font-medium">
          {item}
        </span>
      ))}
    </div>

    <RoleTagRow primaryTags={role.primaryTags} secondaryTags={role.secondaryTags} />
  </div>
);

export default RoleHeroCard;
