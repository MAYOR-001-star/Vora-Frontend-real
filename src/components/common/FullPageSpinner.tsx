import React from 'react';
import { VORA_LOGO_SRC } from '../../constants/brand';

interface FullPageSpinnerProps {
  className?: string;
  isFullPage?: boolean;
}

/** Full-screen heartbeat pulse logo loader, use for background fetches, not button-triggered requests. */
const FullPageSpinner: React.FC<FullPageSpinnerProps> = ({ className = '', isFullPage = true }) => {
  const content = (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Spinning loading circle */}
      <div className="absolute w-[76px] h-[76px] rounded-full border-[3px] border-[#0047CC]/15 border-t-[#0047CC] animate-spin" />
      <img
        src={VORA_LOGO_SRC}
        alt="Loading..."
        className="w-14 h-14 object-contain animate-heartbeat relative z-10"
      />
    </div>
  );

  if (isFullPage) {
    return (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        role="status"
        aria-label="Loading"
      >
        {content}
      </div>
    );
  }

  return content;
};

export default FullPageSpinner;
