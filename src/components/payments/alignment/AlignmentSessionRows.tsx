import type { AlignmentSessionRow } from '../../../types/alignmentReview';

interface AlignmentSessionRowsProps {
  rows: AlignmentSessionRow[];
}

const AlignmentSessionRows: React.FC<AlignmentSessionRowsProps> = ({ rows }) => (
  <div className="space-y-0 text-xs">
    {rows.map((row, index) => (
      <div
        key={row.label}
        className={`flex justify-between gap-3 py-2 ${
          index < rows.length - 1 ? 'border-b border-[#F7F7F7]' : ''
        }`}
      >
        <span className="text-[#808080] font-semibold shrink-0">{row.label}</span>
        <span className={`text-[#1A1A1A] font-bold text-right ${row.valueClassName ?? ''}`}>
          {row.value}
        </span>
      </div>
    ))}
  </div>
);

export default AlignmentSessionRows;
