import React from 'react';
import type { BankAccountDetailRow } from '../../types/topUpWallet';

interface BankAccountDetailsCardProps {
  title?: string;
  rows: BankAccountDetailRow[];
}

const BankAccountDetailsCard: React.FC<BankAccountDetailsCardProps> = ({
  title = 'VORA Virtual Bank Account Details',
  rows,
}) => (
  <div className="bg-[#F7F7F7] border border-[#E6E6E6] rounded-[10px] p-[18px] mb-4">
    <p className="text-xs font-semibold text-[#808080] uppercase tracking-wide mb-3.5">{title}</p>
    <div className="grid gap-2.5">
      {rows.map((row) => (
        <div key={row.label} className="flex justify-between gap-3 text-[13px]">
          <span className="text-[#808080]">{row.label}</span>
          <span
            className={`font-semibold text-right ${
              row.highlight ? 'text-[#0047CC] tracking-wide' : 'text-[#1A1A1A]'
            }`}
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default BankAccountDetailsCard;
