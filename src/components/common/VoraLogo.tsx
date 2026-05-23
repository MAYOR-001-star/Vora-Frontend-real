import React from 'react';
import { Link } from 'react-router-dom';
import { VORA_LOGO_SRC, VORA_WORDMARK_ORA_COLOR } from '../../constants/brand';

export type VoraLogoSize = 'sm' | 'md' | 'lg';

const ICON_HEIGHT: Record<VoraLogoSize, string> = {
  sm: 'h-[16px]',
  md: 'h-[22px]',
  lg: 'h-[26px]',
};

export interface VoraLogoProps {
  size?: VoraLogoSize;
  className?: string;
  to?: string;
  /** When true, show only the ORA wordmark text (no heartbeat image). */
  textOnly?: boolean;
  /** Extra classes for the ORA text (e.g. font-medium on mobile header) */
  textClassName?: string;
}

/**
 * Brand wordmark: GLOHIB heartbeat logo + "ORA" (logo replaces the letter V).
 */
const VoraLogo: React.FC<VoraLogoProps> = ({
  size = 'md',
  className = '',
  to,
  textOnly = false,
  textClassName = '',
}) => {
  const mark = (
    <span
      className={`inline-flex items-end gap-[1px] ${className}`}
      aria-label="VORA"
    >
      {!textOnly && (
        <img
          src={VORA_LOGO_SRC}
          alt=""
          className={`${ICON_HEIGHT[size]} w-auto object-contain shrink-0`}
          aria-hidden
        />
      )}
      <span
        className={`font-medium tracking-[-0.02em] leading-none text-[16px] ${textOnly ? '' : 'pt-[5px]'} ${textClassName}`}
        style={{ color: VORA_WORDMARK_ORA_COLOR }}
      >
        ORA
      </span>
    </span>
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex no-underline cursor-pointer">
        {mark}
      </Link>
    );
  }

  return mark;
};

export default VoraLogo;
