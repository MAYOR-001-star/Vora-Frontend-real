import { CheckIcon, BriefcaseIcon, ClockIcon } from '../../common/Icons';
import type { PublicRoleLandingData } from '../../../types/roleLanding';
import { buildMatchConfirmedTitle, buildMatchConfirmedSubtitle } from '../../../utils/profileMatchResult';
import { MATCH_TOP_PERCENTILE_LABEL } from '../../../constants/profileMatchResult';

interface MatchResultHeroProps {
  score: number;
  role: PublicRoleLandingData;
}

const MatchResultHero: React.FC<MatchResultHeroProps> = ({ score, role }) => {
  const matchConfirmedTitle = buildMatchConfirmedTitle(role);
  const matchConfirmedSubtitle = buildMatchConfirmedSubtitle(role);

  return (
    <div className="bg-white border border-[#E6E6E6] rounded-xl px-5 sm:px-9 pt-9 pb-8 text-center mb-5">
      <div className="text-[32px] mb-4 tracking-[4px]">🎉</div>
      <h2 className="text-[22px] sm:text-[28px] font-extrabold text-[#1A1A1A] tracking-[-0.5px] mb-2.5 leading-[1.2]">
        Your profile is a strong match. You are in.
      </h2>
      <p className="text-[14px] sm:text-[15px] text-[#808080] leading-[1.7] mb-7 max-w-[460px] mx-auto">
        VORA matched your full profile — CV and onboarding information combined — against the JD,
        and you cleared the 80% threshold. Your work authorisation for this role has also been verified.
        Go straight to assessment.
      </p>

      <div className="flex justify-center mb-[18px]">
        <div className="relative w-[130px] h-[130px] sm:w-[152px] sm:h-[152px] shrink-0">
          <svg width="100%" height="100%" viewBox="0 0 152 152" className="absolute inset-0">
            <circle cx="76" cy="76" r="64" fill="none" stroke="#E6E6E6" strokeWidth="12" />
            <circle
              cx="76"
              cy="76"
              r="64"
              fill="none"
              stroke="#0047CC"
              strokeWidth="12"
              strokeDasharray="402.1"
              strokeDashoffset={402.1 - (402.1 * score) / 100}
              strokeLinecap="round"
              transform="rotate(-90 76 76)"
              style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
            <div className="text-[34px] sm:text-[40px] font-extrabold text-[#0047CC] leading-none">
              {score}%
            </div>
            <div className="text-[13px] font-bold text-[#1A1A1A] mt-0.5">Profile Match</div>
          </div>
        </div>
      </div>

      <div className="text-[14px] text-[#808080] font-semibold mb-[18px]">
        {MATCH_TOP_PERCENTILE_LABEL}
      </div>

      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-[7px] mb-5">
        <span className="inline-flex items-center gap-1.5 bg-[#EBF6FF] text-[#182348] border border-[#387DFF] rounded-full px-2.5 sm:px-[13px] py-1 text-[11px] sm:text-[12px] font-bold">
          <BriefcaseIcon size={10} strokeWidth={2.5} className="shrink-0" />
          {role.roleTitle}
        </span>
        {role.metaItems.slice(0, 3).map((meta, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 bg-[#EBF6FF] text-[#182348] border border-[#387DFF] rounded-full px-2.5 sm:px-[13px] py-1 text-[11px] sm:text-[12px] font-bold"
          >
            {meta}
          </span>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2.5 bg-[#EBF6FF] border-[1.5px] border-[#387DFF] rounded-lg px-5 py-3 text-left w-full max-w-[440px]">
          <CheckIcon size={18} strokeWidth={3} className="text-[#0047CC] shrink-0 mt-0.5" />
          <div>
            <div className="text-[15px] font-bold text-[#0047CC]">
              {matchConfirmedTitle}
            </div>
            <div className="text-[12px] text-[#0047CC] mt-0.5">
              {matchConfirmedSubtitle}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchResultHero;
