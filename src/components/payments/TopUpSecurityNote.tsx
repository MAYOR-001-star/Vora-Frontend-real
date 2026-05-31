import React from 'react';
import { LockIcon } from '../common/Icons';

interface TopUpSecurityNoteProps {
  children: React.ReactNode;
}

const TopUpSecurityNote: React.FC<TopUpSecurityNoteProps> = ({ children }) => (
  <p className="flex items-center justify-center gap-1.5 text-[11px] text-[#808080] mt-4">
    <LockIcon size={12} strokeWidth={2} className="shrink-0" />
    {children}
  </p>
);

export default TopUpSecurityNote;
