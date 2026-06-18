import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import VoraLogo from '../../components/common/VoraLogo';
import Button from '../../components/common/Button';
import Tag from '../../components/common/Tag';
import { ArrowRightIcon } from '../../components/common/Icons';

const DocumentCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const BranchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);

const InfoCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
  </svg>
);

interface OptionProps {
  letter: string;
  text: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const OptionCard: React.FC<OptionProps> = ({ letter, text, selected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer border-[1.5px] rounded-[12px] p-[16px_18px] bg-white flex gap-[14px] items-start transition-all duration-150 ${selected ? 'border-[#0047CC] bg-[#EBF6FF] shadow-[0_0_0_3px_rgba(0,71,204,0.1)]' : 'border-[#E6E6E6] hover:border-[#387DFF] hover:bg-[#EBF6FF]'}`}
    >
      <div className={`shrink-0 w-[28px] h-[28px] rounded-full border-[1.5px] flex items-center justify-center text-[12px] font-[900] transition-colors ${selected ? 'bg-[#0047CC] border-[#0047CC] text-white' : 'bg-white border-[#E6E6E6] text-[#ADADAD]'}`}>
        {letter}
      </div>
      <div className="text-[14.5px] text-[#1A1A1A] leading-[1.55] font-[500] pt-[3px]">
        {text}
      </div>
    </div>
  );
};

const RoleAssessmentSessionSituational: React.FC = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (qId: string, optId: string) => {
    setAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === 2; // Two questions on this page

  const handleContinue = () => {
    // In a real flow, this would go to part 4
    // For now, navigate back to dashboard or next
    navigate('/dashboard'); 
  };

  const handleSave = () => {
    toast.success('Saved. You can return anytime within 48 hours.');
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#1A1A1A] font-sans flex flex-col relative pb-[80px]">
      {/* Top Bar */}
      <header className="bg-white/95 backdrop-blur-[10px] border-b border-[#E6E6E6] px-[20px] sm:px-[32px] py-[14px] flex items-center justify-between sticky top-0 z-[50]">
        <span className="inline-flex items-center gap-[1px] text-[#0047CC]">
          <VoraLogo size="sm" to="/dashboard" />
        </span>
        <div className="text-[12.5px] text-[#808080] font-[600] text-center hidden sm:block">
          Stage 1 · Getting to know you
        </div>
        <div className="flex items-center gap-[6px] text-[12px] text-[#808080] font-[600]">
          <div className="w-[16px] h-[16px] rounded-full border border-[#0047CC] bg-white flex items-center justify-center shrink-0">
            <DocumentCheckIcon className="w-[9px] h-[9px] text-[#0047CC]" />
          </div>
          Auto-saved
        </div>
      </header>

      {/* Chapter Rail */}
      <div className="bg-white border-b border-[#E6E6E6] px-[20px] sm:px-[32px] py-[12px] flex items-center justify-center gap-[12px] flex-wrap">
        <div className="flex items-center gap-[7px]">
          <div className="w-[18px] h-[18px] rounded-full bg-[#0047CC] shadow-[0_0_0_4px_rgba(0,71,204,0.12)] flex items-center justify-center text-[9px] font-[800] text-white">1</div>
          <div className="text-[11.5px] font-[700] text-[#0047CC]">How you think</div>
        </div>
        <div className="w-[36px] h-[2px] bg-[#E6E6E6] rounded-[2px] hidden sm:block"></div>
        <div className="flex items-center gap-[7px]">
          <div className="w-[18px] h-[18px] rounded-full bg-[#E6E6E6] flex items-center justify-center text-[9px] font-[800] text-white">2</div>
          <div className="text-[11.5px] font-[700] text-[#ADADAD]">Your instincts</div>
        </div>
      </div>

      {/* Section Rail Pebbles */}
      <div className="bg-gradient-to-b from-white to-[#FBFCFF] border-b border-[#E6E6E6] px-[20px] sm:px-[32px] py-[14px] flex items-center justify-center gap-[6px] flex-wrap">
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#387DFF] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#387DFF] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#0047CC] w-[64px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
      </div>

      {/* Main Content */}
      <main className="max-w-[780px] w-full mx-auto px-[20px] sm:px-[28px] pt-[36px] pb-[100px] flex-1">
        
        <div className="mb-[14px]">
          <Tag 
            variant="blue-soft"
            className="uppercase font-[800] tracking-[0.7px] px-[12px] py-[5px]"
            label={
              <span className="flex items-center gap-[7px]">
                <BranchIcon className="w-[12px] h-[12px]" />
                Part 3 · Working through problems
              </span>
            }
          />
        </div>
        
        <h1 className="text-[22px] font-[900] text-[#1A1A1A] tracking-[-0.3px] leading-[1.3] mb-[8px]">
          A few short scenarios to see how you reason things through.
        </h1>
        <p className="text-[14px] text-[#808080] leading-[1.6] mb-[24px]">
          Take your time. Pick the response that closest matches what you'd genuinely do there's no penalty for thinking carefully.
        </p>

        <div className="flex gap-[10px] items-start mb-[30px] text-[12.5px] text-[#182348] leading-[1.5]">
          <InfoCircleIcon className="w-[15px] h-[15px] text-[#0047CC] shrink-0 mt-[1px]" />
          <div>
            <strong className="font-[800]">Why this matters:</strong> Programme work involves constant judgement calls under imperfect information. This helps surface how you naturally structure decisions.
          </div>
        </div>

        {/* Question 1 */}
        <div className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[18px] p-[24px_28px] mb-[24px]">
          <div className="text-[11px] font-[800] tracking-[0.7px] uppercase text-[#ADADAD] mb-[10px]">
            Scenario
          </div>
          <p className="text-[15.5px] text-[#1A1A1A] leading-[1.7] mb-[6px]">
            You're three months into running a community health outreach across four LGAs. Two of the four are hitting their indicators on time and budget. The other two are 40% behind because of unexpected fuel shortages affecting cold chain logistics. <em className="italic text-[#808080]">Your donor wants a single decision in 48 hours.</em>
          </p>
        </div>

        <div className="mb-[24px]">
          <p className="text-[16px] font-[700] text-[#1A1A1A] leading-[1.5] mb-[6px]">
            What's the first thing you do?
          </p>
          <p className="text-[12.5px] text-[#808080] mb-[14px]">
            One choice the one you'd actually act on first.
          </p>
          <div className="flex flex-col gap-[10px]">
            <OptionCard 
              letter="A" 
              text="Get on a call with the two lagging LGA coordinators today to understand what's recoverable versus structurally blocked, before recommending anything to the donor." 
              selected={answers['q1'] === 'A'} 
              onClick={() => handleAnswer('q1', 'A')} 
            />
            <OptionCard 
              letter="B" 
              text="Send a written status update to the donor outlining the situation honestly, then ask for an extra 72 hours before recommending a path." 
              selected={answers['q1'] === 'B'} 
              onClick={() => handleAnswer('q1', 'B')} 
            />
            <OptionCard 
              letter="C" 
              text="Pull the data from all four LGAs and build a comparative dashboard so the recommendation is grounded in numbers, not impressions." 
              selected={answers['q1'] === 'C'} 
              onClick={() => handleAnswer('q1', 'C')} 
            />
            <OptionCard 
              letter="D" 
              text="Recommend reallocating remaining budget from the lagging LGAs to the two that are performing, to protect the donor's headline outcomes." 
              selected={answers['q1'] === 'D'} 
              onClick={() => handleAnswer('q1', 'D')} 
            />
          </div>
        </div>

        {/* Question 2 */}
        <div className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[18px] p-[24px_28px] mb-[24px]">
          <div className="text-[11px] font-[800] tracking-[0.7px] uppercase text-[#ADADAD] mb-[10px]">
            Follow-up scenario
          </div>
          <p className="text-[15.5px] text-[#1A1A1A] leading-[1.7] mb-[6px]">
            It turns out one of the lagging LGAs is recoverable if you redirect logistics, but the other has a structural problem that will take months to fix. The donor has explicitly said they value <strong className="font-[800] text-[#182348]">equity across all four LGAs</strong> in this programme.
          </p>
        </div>

        <div className="mb-[24px]">
          <p className="text-[16px] font-[700] text-[#1A1A1A] leading-[1.5] mb-[14px]">
            How do you frame your recommendation?
          </p>
          <div className="flex flex-col gap-[10px]">
            <OptionCard 
              letter="A" 
              text="Present a single recommendation that fixes the recoverable LGA, with a separate longer-term plan for the structural one and be upfront that equity will be temporarily uneven." 
              selected={answers['q2'] === 'A'} 
              onClick={() => handleAnswer('q2', 'A')} 
            />
            <OptionCard 
              letter="B" 
              text="Offer two options equity-preserving (slower across all four) and pragmatic (focus on the three that can move) and let the donor decide." 
              selected={answers['q2'] === 'B'} 
              onClick={() => handleAnswer('q2', 'B')} 
            />
            <OptionCard 
              letter="C" 
              text="Stay with the original plan to honour the equity commitment, even if results slip, and rebuild logistics from the ground up." 
              selected={answers['q2'] === 'C'} 
              onClick={() => handleAnswer('q2', 'C')} 
            />
            <OptionCard 
              letter="D" 
              text="Propose pausing the structurally blocked LGA and explicitly redirecting resources to the other three, framing it as protecting the wider mission." 
              selected={answers['q2'] === 'D'} 
              onClick={() => handleAnswer('q2', 'D')} 
            />
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-[10px] border-t border-[#E6E6E6] px-[20px] sm:px-[32px] py-[14px] flex items-center justify-between gap-[12px] z-[50]">
        <div className="text-[13px] text-[#808080] font-[600] hidden sm:block">
          Part 3 of 6 · Stage 1
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[10px] w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            onClick={handleSave}
            className="bg-white text-[#4A4A4A] border-[1.5px] border-[#E6E6E6] rounded-[10px] px-[18px] py-[11px] text-[13.5px] font-[700] hover:border-[#ADADAD] hover:bg-white w-full sm:w-auto"
          >
            Save & finish later
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={!isComplete}
            className={`rounded-[10px] px-[24px] py-[12px] transition-all font-sans inline-flex items-center justify-center gap-[8px] text-[14px] font-[700] border-none w-full sm:w-auto ${isComplete ? 'bg-[#0047CC] text-white shadow-[0_4px_14px_rgba(0,71,204,0.28)] hover:bg-[#344DA1]' : 'bg-[#E6E6E6] text-[#ADADAD] cursor-not-allowed'}`}
          >
            Continue
            <ArrowRightIcon className="w-[14px] h-[14px]" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default RoleAssessmentSessionSituational;
