import React from 'react';
import ToastSuccessIcon from './ToastSuccessIcon';

export type StepStatus = 'completed' | 'current' | 'upcoming';

interface StepStatusIconProps {
  status: StepStatus;
  size?: 'sm' | 'md';
  className?: string;
}

const sizeStyles = {
  md: {
    circle: 'w-[22px] h-[22px]',
    dot: 'w-2 h-2',
  },
  sm: {
    circle: 'w-[18px] h-[18px]',
    dot: 'w-1.5 h-1.5',
  },
} as const;

const statusStyles: Record<Exclude<StepStatus, 'completed'>, string> = {
  current: 'border-[#0047CC] bg-white',
  upcoming: 'border-[#E6E6E6] bg-white',
};

const StepStatusIcon: React.FC<StepStatusIconProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  if (status === 'completed') {
    return <ToastSuccessIcon size={size} className={className} />;
  }

  const styles = sizeStyles[size];

  return (
    <div
      className={`${styles.circle} rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${statusStyles[status]} ${className}`}
      aria-hidden
    >
      {status === 'current' && (
        <div className={`${styles.dot} rounded-full bg-[#0047CC]`} />
      )}
    </div>
  );
};

export default StepStatusIcon;
