import React from 'react';
import { BriefcaseIcon, LocationIcon } from '../common/Icons';
import Tag from '../common/Tag';

interface RoleSummaryPillProps {
  roleTitle: string;
  formatLocationLabel: string;
}

const RoleSummaryPill: React.FC<RoleSummaryPillProps> = ({ roleTitle, formatLocationLabel }) => (
  <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-[#E6E6E6] rounded-xl px-4 py-3.5 mb-6">
    <div className="flex items-center gap-2.5 min-w-0">
      <BriefcaseIcon size={16} className="text-[#0047CC] shrink-0" strokeWidth={2} />
      <div className="min-w-0">
        <span className="text-xs font-bold text-[#0047CC] uppercase tracking-wide mr-2">
          Role
        </span>
        <span className="text-[15px] font-bold text-[#1A1A1A]">{roleTitle}</span>
      </div>
    </div>
    <Tag
      label={
        <span className="flex items-center gap-1.5">
          <LocationIcon size={11} strokeWidth={2.5} />
          {formatLocationLabel}
        </span>
      }
      variant="blue"
      className="shrink-0"
    />
  </div>
);

export default RoleSummaryPill;
