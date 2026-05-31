import { ShieldIcon, XCircleIcon } from '../../common/Icons';
import Button from '../../common/Button';

interface MatchBlockedEligibilityCardProps {
  score: number;
  reasons: { key: string; value: string }[];
}

const MatchBlockedEligibilityCard: React.FC<MatchBlockedEligibilityCardProps> = ({ score, reasons }) => {
  return (
    <div className="bg-white border border-[#E6E6E6] rounded-[10px] overflow-hidden mb-[18px]">
      <div className="bg-[#FEF2F2] border-b border-[#FECACA] p-6 pb-5 flex flex-col sm:flex-row gap-4 items-start">
        <div className="w-[52px] h-[52px] rounded-full bg-white border-2 border-[#FECACA] flex items-center justify-center shrink-0">
          <ShieldIcon size={24} strokeWidth={2.5} className="text-[#DC2626]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#991B1B] tracking-tight mb-1.5">
            Your profile is strong — but this role is out of reach right now
          </h2>
          <p className="text-sm text-[#7F1D1D] leading-relaxed">
            VORA does not show match scores for roles you cannot legally work in. This is not about your skills or profile quality — it is about work rights. We would rather tell you the truth up front than let you go through a full assessment for a role that cannot legally hire you.
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row items-center gap-5 bg-[#F7F7F7] border-[1.5px] border-[#E6E6E6] rounded-[10px] p-[18px] sm:px-[22px] mb-[18px]">
          <div className="text-center sm:text-left shrink-0">
            <div className="text-4xl font-extrabold text-[#991B1B] leading-none">{score}%</div>
            <div className="text-[13px] font-bold text-[#DC2626] mt-1">Estimated profile fit</div>
          </div>
          <div className="text-sm text-[#4A4A4A] leading-relaxed text-center sm:text-left">
            <strong className="text-[#1A1A1A]">Your profile would have scored {score}% on this role.</strong> That is a strong match — top 15% of all applicants. But match score alone does not determine access. Work eligibility is a hard pre-condition, and it is not met for this role based on the work rights you declared.
          </div>
        </div>

        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-4 sm:px-5 mb-[18px]">
          <div className="text-sm font-bold text-[#991B1B] mb-2.5 flex items-center gap-2">
            <XCircleIcon size={14} strokeWidth={2.5} className="shrink-0" />
            Why this role is not available to you right now
          </div>
          {reasons.map((reason, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-2 border-b border-[#FECACA] text-[13px] last:border-b-0 gap-1 sm:gap-4">
              <span className="text-[#7F1D1D] font-semibold shrink-0">{reason.key}</span>
              <span className={`font-bold sm:text-right ${reason.key === 'Result' ? 'text-[#991B1B] text-[14px] font-extrabold' : 'text-[#991B1B]'}`}>
                {reason.value}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#E6E6E6] rounded-[10px] p-5 sm:px-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 text-center sm:text-left">
            <div className="text-sm font-bold text-[#1A1A1A] mb-1">Did we get your work rights wrong?</div>
            <div className="text-[13px] text-[#808080] leading-relaxed">
              If you hold an EU/EEA passport, a Swedish work permit, or residency in Sweden that you did not declare during onboarding — update your profile and VORA will re-run the check immediately.
            </div>
          </div>
          <Button variant="primary" fullWidth={false} className="shrink-0 whitespace-nowrap">
            Update my work rights
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchBlockedEligibilityCard;
