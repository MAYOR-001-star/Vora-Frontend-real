import { useState } from 'react';
import { BellIcon, CheckIcon, ClockIcon } from '../../common/Icons';
import Button from '../../common/Button';
import Tag from '../../common/Tag';
import toast from 'react-hot-toast';

interface PathwayStep {
  number: number;
  title: string;
  description: string;
  tags: { text: string; color: string; iconName?: string }[];
}

interface MatchBlockedGapAnalysisCardProps {
  steps: PathwayStep[];
}

const MatchBlockedGapAnalysisCard: React.FC<MatchBlockedGapAnalysisCardProps> = ({ steps }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertSet, setAlertSet] = useState(false);

  const handleAlert = () => {
    setAlertSet(true);
    toast.success('Alert set! VORA will notify you when your eligibility changes.');
  };

  return (
    <div className="mb-[18px]">
      <div
        className={`bg-white border border-[#E6E6E6] p-6 sm:p-[26px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-all ${isOpen ? 'rounded-t-xl border-b-0' : 'rounded-xl'
          }`}
      >
        <div className="flex-1">
          <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-1.5">
            Want to work in Sweden eventually? Here is your path.
          </h2>
          <p className="text-[13px] text-[#808080] leading-[1.5] mb-3.5">
            EU/EEA work rights are achievable, through postgraduate study in the EU, employer
            sponsorship from a different company, or building your track record through remote
            global health roles first. VORA can map the most realistic route based on your current
            profile.
          </p>
          <div className="flex flex-wrap gap-2">
            <Tag variant="gray" label="EU postgrad pathway" />
            <Tag variant="gray" label="Remote roles first" />
            <Tag variant="gray" label="STTA contracts" />
            <Tag variant="gray" label="Career gap analysis" />
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center gap-1.5 px-6 py-[11px] bg-[#0047CC] text-white rounded-full text-sm font-bold whitespace-nowrap hover:bg-[#0038A8] transition-colors shrink-0"
        >
          {isOpen ? 'Hide pathway' : 'Show me my path'}
        </button>
      </div>

      {isOpen && (
        <div className="bg-white border border-[#E6E6E6] border-t-0 rounded-b-xl p-6 sm:p-[26px]">
          <h3 className="text-[15px] font-bold text-[#1A1A1A] mb-3.5">
            Your realistic path to EU/EEA-eligible global health roles
          </h3>
          <div className="flex flex-col">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex gap-3.5 py-3.5 border-b border-[#F7F7F7] last:border-b-0"
              >
                <div className="w-8 h-8 rounded-full bg-white border-2 border-[#E6E6E6] text-[#808080] flex items-center justify-center text-[13px] font-bold shrink-0 mt-0.5">
                  {step.number}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1A1A1A] mb-1">{step.title}</div>
                  <div className="text-[13px] text-[#808080] leading-relaxed mb-2">
                    {step.description}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {step.tags.map((tag, tIndex) => (
                      <Tag
                        key={tIndex}
                        variant={tag.color === 'blue' ? 'blue-light' : tag.color === 'green' ? 'green-light' : 'gray'}
                        label={
                          tag.iconName === 'clock' ? (
                            <span className="flex items-center gap-1">
                              <ClockIcon size={12} strokeWidth={2.5} />
                              {tag.text}
                            </span>
                          ) : (
                            tag.text
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-3.5 pt-3.5 mt-2">
              <div className="w-8 h-8 rounded-full bg-[#EBF6FF] border-2 border-[#387DFF] text-[#0047CC] flex items-center justify-center text-[13px] font-bold shrink-0 mt-0.5">
                <CheckIcon size={14} strokeWidth={3} />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0047CC] mb-1">
                  Re-apply when your eligibility changes, VORA will alert you
                </div>
                <div className="text-[13px] text-gray-600 leading-relaxed mb-2">
                  Once you hold EU/EEA work rights, Swedish residency, or a valid work permit,
                  update your work authorisation in your VORA profile. VORA will immediately re-run
                  your eligibility check and notify you of roles you are now cleared for, including
                  roles like this one.
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth={false}
                  onClick={handleAlert}
                  disabled={alertSet}
                  className="mt-1"
                >
                  {alertSet ? (
                    <>
                      <CheckIcon size={14} strokeWidth={2.5} />
                      Alert set!
                    </>
                  ) : (
                    <>
                      <BellIcon size={14} strokeWidth={2.5} />
                      Alert me when my eligibility changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchBlockedGapAnalysisCard;
