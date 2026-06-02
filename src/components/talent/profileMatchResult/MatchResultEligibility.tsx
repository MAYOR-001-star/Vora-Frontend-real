import React from 'react';

const MatchResultEligibility: React.FC = () => (
  <div className="bg-white border border-[#E6E6E6] rounded-xl p-5 mb-5 text-left">
    <h2 className="text-[15px] font-bold text-[#1A1A1A] mb-1">
      Work authorisation confirmed, you qualify to work in this role
    </h2>
    <p className="text-[13px] text-[#808080] leading-relaxed">
      VORA verified your nationality, country of residence, and right-to-work status against this
      role&apos;s requirements. You are fully cleared to proceed to assessment.
    </p>
  </div>
);

export default MatchResultEligibility;
