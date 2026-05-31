import { ShieldIcon } from '../../common/Icons';

const MatchResultEligibility: React.FC = () => (
  <div className="bg-[#EBF6FF] border border-[#387DFF] rounded-[10px] px-[18px] py-[14px] mb-5 flex items-start gap-2.5">
    <ShieldIcon size={16} strokeWidth={2.5} className="text-[#0047CC] shrink-0 mt-0.5" />
    <div>
      <div className="text-[13px] font-bold text-[#0047CC] mb-1">
        ✓ Work authorisation confirmed — you qualify to work in this role
      </div>
      <div className="text-[13px] text-[#0047CC] leading-[1.5]">
        VORA verified your nationality, country of residence, and right-to-work status against this
        role&apos;s requirements. You are fully cleared to proceed to assessment.
      </div>
    </div>
  </div>
);

export default MatchResultEligibility;
