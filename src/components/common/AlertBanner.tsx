import React from 'react';
import { AlertTriangleIcon } from './Icons';

type AlertBannerVariant = 'amber' | 'green' | 'red' | 'blue';

interface AlertBannerProps {
  children: React.ReactNode;
  variant?: AlertBannerVariant;
  className?: string;
}

const variantStyles: Record<AlertBannerVariant, string> = {
  amber: 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]',
  green: 'bg-[#EEFBEE] border-[#85E585] text-[#135813]',
  red: 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]',
  blue: 'bg-[#EBF6FF] border-[#BDD9FF] text-[#1e3a8a]',
};

const AlertBanner: React.FC<AlertBannerProps> = ({ children, variant = 'amber', className = '' }) => (
  <div
    className={`border-[1.5px] rounded-[10px] px-4 py-3.5 flex gap-3 items-start ${variantStyles[variant]} ${className}`}
  >
    <AlertTriangleIcon size={16} className="shrink-0 mt-0.5" strokeWidth={2} />
    <div className="text-[13px] leading-relaxed [&_strong]:font-bold">{children}</div>
  </div>
);

export default AlertBanner;
