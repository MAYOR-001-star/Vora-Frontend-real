import React from 'react';

interface DetailRowListProps {
  rows: { label: string; value: string }[];
  trueupNote?: string;
}

const DetailRowList: React.FC<DetailRowListProps> = ({ rows, trueupNote }) => (
  <>
    {rows.map((row) => (
      <div
        key={row.label}
        className="flex justify-between gap-4 text-[13px] py-2 border-b border-[#F7F7F7] last:border-0"
      >
        <span className="text-[#808080]">{row.label}</span>
        <span className="font-semibold text-[#1A1A1A] text-right">{row.value}</span>
      </div>
    ))}
    {trueupNote && (
      <div className="bg-[#F7F7F7] border border-[#E6E6E6] rounded-[10px] px-3.5 py-3 mt-3">
        <p className="text-[11px] font-semibold text-[#808080] uppercase tracking-wide mb-2">
          True-Up Mechanics
        </p>
        <p className="text-xs text-[#4A4A4A] leading-relaxed">{trueupNote}</p>
      </div>
    )}
  </>
);

export default DetailRowList;
