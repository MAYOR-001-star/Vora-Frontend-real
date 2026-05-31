import React from 'react';
import type { PaymentStatusBadgeVariant } from '../../types/paymentsOverview';

const VARIANT_STYLES: Record<PaymentStatusBadgeVariant, { bg: string; text: string; dot: string }> = {
  completed: { bg: 'bg-[#EEFBEE]', text: 'text-[#135813]', dot: 'bg-[#2CA62C]' },
  pending: { bg: 'bg-[#FFFBEB]', text: 'text-[#92400E]', dot: 'bg-[#D97706]' },
  held: { bg: 'bg-[#EBF6FF]', text: 'text-[#0047CC]', dot: 'bg-[#0047CC]' },
  refunded: { bg: 'bg-[#F7F7F7]', text: 'text-[#808080]', dot: 'bg-[#ADADAD]' },
  failed: { bg: 'bg-[#FEF2F2]', text: 'text-[#DC2626]', dot: 'bg-[#DC2626]' },
  hired: { bg: 'bg-[#EEFBEE]', text: 'text-[#135813]', dot: 'bg-[#2CA62C]' },
  flagged: { bg: 'bg-[#FEF2F2]', text: 'text-[#DC2626]', dot: 'bg-[#DC2626]' },
};

interface StatusBadgeProps {
  label: string;
  variant: PaymentStatusBadgeVariant;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ label, variant }) => {
  const s = VARIANT_STYLES[variant];
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}
    >
      <span className={`w-1 h-1 rounded-full shrink-0 ${s.dot}`} />
      {label}
    </span>
  );
};

export default StatusBadge;
