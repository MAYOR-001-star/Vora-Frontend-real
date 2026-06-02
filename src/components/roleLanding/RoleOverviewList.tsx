import type { RoleOverviewRow } from '../../types/roleLanding';

interface RoleOverviewListProps {
  rows: RoleOverviewRow[];
}

const RoleOverviewList: React.FC<RoleOverviewListProps> = ({ rows }) => (
  <div>
    {rows.map((row) => (
      <div
        key={row.label}
        className="flex justify-between items-center gap-3 py-2.5 border-b border-[#E6E6E6] last:border-0 text-sm"
      >
        <span className="text-[#808080] font-medium shrink-0">{row.label}</span>
        <span className={`font-semibold text-right ${row.valueClassName ?? 'text-[#1A1A1A]'}`}>
          {row.value}
        </span>
      </div>
    ))}
  </div>
);

export default RoleOverviewList;
