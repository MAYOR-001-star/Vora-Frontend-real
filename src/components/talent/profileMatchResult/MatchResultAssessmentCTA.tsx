import { MATCH_ASSESSMENT_PILLS } from '../../../constants/profileMatchResult';
import { ChevronRightIcon, UsersIcon } from '../../common/Icons';
import Button from '../../common/Button';

const MatchResultAssessmentCTA: React.FC = () => (
  <>
    <div className="bg-[#EBF6FF] border border-[#387DFF] rounded-xl p-[20px] sm:px-[28px] sm:py-[26px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-5">
      <div className="flex-1">
        <h3 className="text-[18px] font-bold text-[#0047CC] mb-1.5">
          Ready to lock in your spot?
        </h3>
        <p className="text-[13px] text-[#0047CC] leading-[1.5] mb-3.5">
          Complete the 3-part assessment and let your score do the talking. Takes 30–40 minutes.
        </p>
        <div className="flex flex-wrap gap-2">
          {MATCH_ASSESSMENT_PILLS.map((pill) => (
            <span
              key={pill}
              className="bg-white border border-[#387DFF] rounded-full px-[13px] py-[5px] text-[12px] font-bold text-[#0047CC]"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
      <Button 
        variant="primary" 
        size="md" 
        pill 
        fullWidth={false} 
        className="w-full sm:w-auto shrink-0 gap-1.5 !px-6"
      >
        Go to assessment
        <ChevronRightIcon size={14} strokeWidth={2.5} />
      </Button>
    </div>

    <div className="bg-[#EBF6FF] border border-[#387DFF] rounded-[10px] px-[22px] py-[18px] flex flex-col sm:flex-row gap-2.5 sm:gap-3.5 items-start">
      <div className="w-[30px] h-[30px] sm:w-[36px] sm:h-[36px] rounded-full bg-white flex items-center justify-center shrink-0 sm:mt-0.5">
        <UsersIcon size={17} strokeWidth={2.5} className="text-[#0047CC]" />
      </div>
      <div>
        <div className="text-[14px] font-bold text-[#0047CC] mb-1.5">
          One possible final step — and it is a great sign
        </div>
        <div className="text-[13px] text-[#0047CC] leading-[1.6]">
          Some employers add a brief <strong className="text-[#0047CC] font-bold">team alignment session</strong>{' '}
          (video or in-person) after assessment — a short conversation to check team culture fit and
          working style. Not every role has one. But if you are invited to one,{' '}
          <strong className="text-[#0047CC] font-bold">treat it as a near-certain offer</strong>. The technical
          screening is done; they are just deciding where to seat you.
        </div>
      </div>
    </div>
  </>
);

export default MatchResultAssessmentCTA;
