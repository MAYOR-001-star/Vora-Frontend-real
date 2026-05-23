import React from 'react';
import { AlertTriangleIcon } from './Icons';

interface ChangeFlagProps {
  message: string;
  className?: string;
}

const ChangeFlag: React.FC<ChangeFlagProps> = ({ message, className = '' }) => (
  <p className={`text-[11px] text-[#92400E] font-bold mt-1 flex items-start gap-1 ${className}`}>
    <AlertTriangleIcon size={10} className="shrink-0 mt-0.5" strokeWidth={2.5} />
    <span>{message}</span>
  </p>
);

export default ChangeFlag;
