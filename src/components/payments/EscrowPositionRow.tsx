import React from 'react';
import { ChevronRightIcon } from '../common/Icons';
import type { EscrowPositionItem } from '../../types/paymentsOverview';

interface EscrowPositionRowProps extends EscrowPositionItem {
  onClick?: () => void;
}

const EscrowPositionRow: React.FC<EscrowPositionRowProps> = ({
  job,
  meta,
  amount,
  amountColor = '#1A1A1A',
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center gap-3 py-3 border-b border-[#F7F7F7] last:border-0 hover:bg-[#F7F7F7] -mx-5 px-5 transition-colors text-left cursor-pointer"
  >
    <div className="flex-1 min-w-0">
      <p className="text-[13px] font-medium text-[#1A1A1A] truncate mb-0.5">{job}</p>
      <p className="text-[11px] text-[#808080]">{meta}</p>
    </div>
    <span className="text-[13px] font-semibold shrink-0" style={{ color: amountColor }}>
      {amount}
    </span>
    <ChevronRightIcon size={14} className="text-[#ADADAD] shrink-0" strokeWidth={2} />
  </button>
);

export default EscrowPositionRow;
