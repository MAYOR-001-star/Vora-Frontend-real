import type { RoleOverviewRow } from '../../types/roleLanding';

interface RoleOverviewListProps {
  rows: RoleOverviewRow[];
}

const RoleOverviewList: React.FC<RoleOverviewListProps> = ({ rows }) => (
  <div>
    {rows.map((row) => (
      <div
        key={row.label}
        className="grid grid-cols-1 sm:grid-cols-[42%_58%] gap-1 sm:gap-3 py-3 border-b border-[#E6E6E6] last:border-0 text-sm"
      >
        <span className="text-[#808080] font-medium">{row.label}</span>
        <span className={`font-semibold sm:text-right break-words ${row.valueClassName ?? 'text-[#1A1A1A]'}`}>
          {row.value}
        </span>
      </div>
    ))}
  </div>
);

export default RoleOverviewList;
