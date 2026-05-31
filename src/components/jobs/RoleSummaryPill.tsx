import React from 'react';
import { BriefcaseIcon, LocationIcon } from '../common/Icons';

interface RoleSummaryPillProps {
  roleTitle: string;
  formatLocationLabel: string;
}

const RoleSummaryPill: React.FC<RoleSummaryPillProps> = ({ roleTitle, formatLocationLabel }) => (
  <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-[#E6E6E6] rounded-xl px-4 py-3.5 mb-6">
    <div className="flex items-center gap-2.5 min-w-0">
      <BriefcaseIcon size={16} className="text-[#808080] shrink-0" strokeWidth={2} />
      <div className="min-w-0">
        <span className="text-[10px] font-bold text-[#808080] uppercase tracking-wide mr-2">
          Role
        </span>
        <span className="text-[15px] font-bold text-[#1A1A1A]">{roleTitle}</span>
      </div>
    </div>
    <span className="inline-flex items-center gap-1.5 bg-[#0047CC] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shrink-0">
      <LocationIcon size={11} strokeWidth={2.5} />
      {formatLocationLabel}
    </span>
  </div>
);

export default RoleSummaryPill;
