import Tag from '../../common/Tag';
import type { PublicRoleLandingData } from '../../../types/roleLanding';

interface MatchRoleMetaPillsProps {
  role: Pick<PublicRoleLandingData, 'roleTitle' | 'formatLocationLabel' | 'overviewRows'>;
}

const pillClass =
  '!rounded-full !px-3 !py-1 !text-xs !font-bold gap-1 !border !border-[#387DFF] !text-[#182348]';

const MatchRoleMetaPills: React.FC<MatchRoleMetaPillsProps> = ({ role }) => {
  const contract = role.overviewRows.find((row) => row.label === 'Contract')?.value;
  const duration = role.overviewRows.find((row) => row.label === 'Duration')?.value;
  const contractLabel =
    contract && duration ? `${contract} · ${duration}` : contract ?? duration;

  return (
    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-[7px] mb-5">
      <Tag label={role.roleTitle} variant="blue" className={pillClass} />
      <Tag label={role.formatLocationLabel} variant="blue" className={pillClass} />
      {contractLabel ? (
        <Tag label={`💼 ${contractLabel}`} variant="blue" className={pillClass} />
      ) : null}
      <Tag label="⏰ CET ± 2 hrs" variant="blue" className={pillClass} />
    </div>
  );
};

export default MatchRoleMetaPills;
