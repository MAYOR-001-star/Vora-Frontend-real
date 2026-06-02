import React from 'react';
import { AlertTriangleIcon, CloseIcon } from './Icons';

type AlertBannerVariant = 'amber' | 'green' | 'red' | 'blue';

interface AlertBannerProps {
  children: React.ReactNode;
  variant?: AlertBannerVariant;
  className?: string;
  onDismiss?: () => void;
  /** When false, omits the leading icon (e.g. inline callouts inside cards). */
  showIcon?: boolean;
}

const variantStyles: Record<AlertBannerVariant, string> = {
  amber: 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]',
  green: 'bg-[#EEFBEE] border-[#85E585] text-[#135813]',
  red: 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]',
  blue: 'bg-white border-[#BDD9FF] text-[#1e3a8a]',
};

const AlertBanner: React.FC<AlertBannerProps> = ({
  children,
  variant = 'amber',
  className = '',
  onDismiss,
  showIcon = true,
}) => (
  <div
    className={`border-[1.5px] rounded-[10px] px-4 py-3.5 flex gap-3 items-start ${variantStyles[variant]} ${className}`}
  >
    {showIcon && (
      <AlertTriangleIcon size={16} className="shrink-0 mt-0.5" strokeWidth={2} />
    )}
    <div className="flex-1 text-[13px] leading-relaxed [&_strong]:font-semibold">{children}</div>
    {onDismiss && (
      <button
        type="button"
        onClick={onDismiss}
        className="text-current opacity-60 hover:opacity-100 p-0.5 cursor-pointer shrink-0"
        aria-label="Dismiss"
      >
        <CloseIcon size={14} strokeWidth={2.5} />
      </button>
    )}
  </div>
);

export default AlertBanner;
