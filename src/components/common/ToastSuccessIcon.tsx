import React from 'react';

interface ToastSuccessIconProps {
  size?: 'sm' | 'md';
  className?: string;
}

const circleSize = {
  sm: 'w-[18px] h-[18px]',
  md: 'w-[22px] h-[22px]',
} as const;

const checkSize = {
  sm: 10,
  md: 12,
} as const;

/** Success indicator for toasts: blue circle, bold white tick. */
const ToastSuccessIcon: React.FC<ToastSuccessIconProps> = ({
  size = 'sm',
  className = '',
}) => {
  const iconSize = checkSize[size];

  return (
    <div
      className={`${circleSize[size]} rounded-full bg-[#0047CC] flex items-center justify-center shrink-0 ${className}`}
      aria-hidden
    >
      <svg
        width={iconSize}
        height={iconSize}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        className="text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={4}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
  );
};

export default ToastSuccessIcon;
