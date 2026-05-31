import React from 'react';
import { RefreshIcon } from '../common/Icons';
import type { TransactionIconVariant } from '../../types/paymentsOverview';

const ICON_STYLES: Record<TransactionIconVariant, string> = {
  topup: 'bg-[#EBF6FF] text-[#0047CC]',
  fee: 'bg-[#EBF6FF] text-[#0047CC]',
  escrow: 'bg-[#EBF6FF] text-[#0047CC]',
  refund: 'bg-[#EBF6FF] text-[#0047CC]',
  align: 'bg-[#EBF6FF] text-[#0047CC]',
  trueup: 'bg-[#EBF6FF] text-[#0047CC]',
  'trueup-credit': 'bg-[#EBF6FF] text-[#0047CC]',
  withdraw: 'bg-[#F7F7F7] text-[#808080]',
};

interface TransactionTypeIconProps {
  variant: TransactionIconVariant;
  size?: 'sm' | 'md';
}

const TransactionTypeIcon: React.FC<TransactionTypeIconProps> = ({ variant, size = 'md' }) => {
  const boxSize = size === 'sm' ? 'w-8 h-8 rounded-[9px]' : 'w-9 h-9 rounded-[10px]';
  const iconSize = size === 'sm' ? 13 : 16;
  const className = ICON_STYLES[variant];
  const box = `${boxSize} flex items-center justify-center shrink-0 ${className}`;

  if (variant === 'refund' || variant === 'trueup-credit') {
    return (
      <div className={box}>
        <RefreshIcon size={iconSize} strokeWidth={2} />
      </div>
    );
  }

  return (
    <div className={box}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        {variant === 'topup' && (
          <>
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </>
        )}
        {variant === 'escrow' && (
          <>
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </>
        )}
        {(variant === 'trueup' || variant === 'fee') && (
          <>
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </>
        )}
        {variant === 'align' && (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </>
        )}
        {variant === 'withdraw' && (
          <>
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </>
        )}
      </svg>
    </div>
  );
};

export default TransactionTypeIcon;
