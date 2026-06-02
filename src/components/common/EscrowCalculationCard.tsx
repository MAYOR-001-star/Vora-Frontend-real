import React from 'react';

export interface EscrowCalculationRow {
  label: string;
  value: string;
}

interface EscrowCalculationCardProps {
  title: string;
  rows: EscrowCalculationRow[];
  totalLabel: string;
  totalValue: string;
  footnote?: string;
  className?: string;
}

const EscrowCalculationCard: React.FC<EscrowCalculationCardProps> = ({
  title,
  rows,
  totalLabel,
  totalValue,
  footnote,
  className = '',
}) => (
  <div
    className={`bg-white border border-[#BDD9FF] rounded-xl p-4.5 mt-4 ${className}`}
  >
    <div className="text-[13px] font-medium text-[#182348] mb-2.5 flex items-center gap-1.5">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#182348" strokeWidth="2" aria-hidden>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
      {title}
    </div>
    <div className="space-y-1.5">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex justify-between py-1.5 border-b border-[#BDD9FF]/60 text-[13px]"
        >
          <span className="text-[#182348]/80 font-medium">{row.label}</span>
          <span className="text-[#182348] font-medium">{row.value}</span>
        </div>
      ))}
      <div className="flex justify-between pt-2 text-[14px] font-medium">
        <span className="text-[#0047CC]">{totalLabel}</span>
        <span className="text-[#0047CC]">{totalValue}</span>
      </div>
    </div>
    {footnote ? (
      <p className="text-[11px] text-[#1e3a8a] mt-2.5 leading-relaxed bg-white/50 rounded-lg p-2 font-medium">
        {footnote}
      </p>
    ) : null}
  </div>
);

export default EscrowCalculationCard;
