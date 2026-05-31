import React from 'react';
import type { RateInfoRow } from '../../types/paymentsOverview';

interface RateInfoCardProps {
  title?: string;
  rows: RateInfoRow[];
}

const RateInfoCard: React.FC<RateInfoCardProps> = ({
  title = 'Escrow & True-Up Model',
  rows,
}) => (
  <div className="bg-[#EBF6FF] border border-[#387DFF] rounded-xl px-5 py-4 mb-3.5">
    <p className="text-[11px] font-semibold text-[#0047CC] uppercase tracking-wide mb-3">{title}</p>
    {rows.map((row) => (
      <div
        key={row.key}
        className="flex justify-between gap-3 py-1.5 border-b border-[#0047CC]/10 last:border-0 text-xs"
      >
        <span className="text-[#4A4A4A]">{row.key}</span>
        <span className="font-semibold text-[#0047CC] text-right">{row.value}</span>
      </div>
    ))}
  </div>
);

export default RateInfoCard;
