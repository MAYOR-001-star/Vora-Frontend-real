import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import VoraLogo from '../../components/common/VoraLogo';
import Button from '../../components/common/Button';
import Tag from '../../components/common/Tag';

const DocumentCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

interface OptionProps {
  letter: string;
  text: string;
  isBest: boolean;
  isWorst: boolean;
  onSelectBest: () => void;
  onSelectWorst: () => void;
}

const OptionCard: React.FC<OptionProps> = ({ 
  letter, 
  text, 
  isBest, 
  isWorst, 
  onSelectBest, 
  onSelectWorst 
}) => {
  let cardStyles = 'border-[#E6E6E6] bg-white';
  if (isBest) {
    cardStyles = 'border-[#387DFF]/60 bg-gradient-to-b from-[#EBF6FF] to-white';
  } else if (isWorst) {
    cardStyles = 'border-[#F5B7BE] bg-gradient-to-b from-[#FEEBEE] to-white';
  }

  return (
    <div className={`border-[1.5px] rounded-[14px] p-[16px_18px] flex gap-[14px] items-start transition-all duration-150 ${cardStyles}`}>
      {/* Option Letter */}
      <div className="shrink-0 w-[30px] h-[30px] rounded-full border-[1.5px] border-[#E6E6E6] bg-white flex items-center justify-center text-[12px] font-[900] text-[#ADADAD] mt-[1px]">
        {letter}
      </div>

      {/* Option Text */}
      <div className="flex-1 text-[14.5px] text-[#1A1A1A] font-[500] leading-[1.55]">
        {text}
      </div>

      {/* Select buttons */}
      <div className="flex flex-col gap-[6px] shrink-0">
        <button 
          onClick={onSelectBest}
          className={`cursor-pointer border-[1.5px] rounded-[8px] p-[6px_10px] font-sans text-[11px] font-[700] flex items-center gap-[6px] transition-all duration-150 ${
            isBest 
              ? 'border-[#0047CC] bg-[#0047CC] text-white' 
              : 'border-[#E6E6E6] bg-white text-[#808080] hover:border-[#387DFF] hover:text-[#0047CC]'
          }`}
        >
          <div className={`w-[10px] h-[10px] rounded-full transition-colors ${isBest ? 'bg-white' : 'bg-[#0047CC]'}`}></div>
          Most
        </button>
        <button 
          onClick={onSelectWorst}
          className={`cursor-pointer border-[1.5px] rounded-[8px] p-[6px_10px] font-sans text-[11px] font-[700] flex items-center gap-[6px] transition-all duration-150 ${
            isWorst 
              ? 'border-[#DC3545] bg-[#DC3545] text-white' 
              : 'border-[#E6E6E6] bg-white text-[#808080] hover:border-[#387DFF] hover:text-[#0047CC]'
          }`}
        >
          <div className={`w-[10px] h-[10px] rounded-full transition-colors ${isWorst ? 'bg-white' : 'bg-[#DC3545]'}`}></div>
          Least
        </button>
      </div>
    </div>
  );
};

const RoleAssessmentSessionTwoBestWorst: React.FC = () => {
  const navigate = useNavigate();
  const { roleSlug = '' } = useParams<{ roleSlug: string }>();

  const [bestPick, setBestPick] = useState<string | null>(null);
  const [worstPick, setWorstPick] = useState<string | null>(null);

  const handleSelectBest = (id: string) => {
    if (bestPick === id) {
      setBestPick(null);
    } else {
      setBestPick(id);
      if (worstPick === id) {
        setWorstPick(null);
      }
    }
  };

  const handleSelectWorst = (id: string) => {
    if (worstPick === id) {
      setWorstPick(null);
    } else {
      setWorstPick(id);
      if (bestPick === id) {
        setBestPick(null);
      }
    }
  };

  const handleContinue = () => {
    navigate(`/onboarding/talent/${roleSlug}/assessment/session-2/combine`);
  };

  const handleSave = () => {
    toast.success('Saved. You can return anytime within 48 hours.');
  };

  const isComplete = bestPick !== null && worstPick !== null && bestPick !== worstPick;

  const options = [
    {
      id: 'a',
      letter: 'A',
      text: 'Acknowledge the gap directly, walk through how the figures were arrived at, and offer to share the underlying data with the donor afterwards.'
    },
    {
      id: 'b',
      letter: 'B',
      text: 'Defer to the country director, even though you can sense she may not have the field-level detail to respond accurately.'
    },
    {
      id: 'c',
      letter: 'C',
      text: 'Reframe the question by pointing to the upcoming methodology change that will resolve the issue from the next quarter.'
    },
    {
      id: 'd',
      letter: 'D',
      text: 'Politely note that field realities are more nuanced than any single dashboard captures, and offer to set up a follow-up call with full context.'
    },
    {
      id: 'e',
      letter: 'E',
      text: 'Stay quiet during the meeting and raise your concerns with the country director privately afterwards.'
    }
  ];

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
          <div className="w-[18px] h-[18px] rounded-full bg-[#0047CC] flex items-center justify-center">
            <DocumentCheckIcon className="w-[10px] h-[10px] text-white" />
          </div>
          <div className="text-[11.5px] font-[700] text-[#808080]">How you think</div>
        </div>
        <div className="w-[36px] h-[2px] bg-[#0047CC] rounded-[2px] hidden sm:block"></div>
        <div className="flex items-center gap-[7px]">
          <div className="w-[18px] h-[18px] rounded-full bg-[#0047CC] shadow-[0_0_0_4px_rgba(0,71,204,0.12)] flex items-center justify-center text-[9px] font-[800] text-white">2</div>
          <div className="text-[11.5px] font-[700] text-[#0047CC]">Your instincts</div>
        </div>
      </div>

      {/* Pebble Rail */}
      <div className="bg-gradient-to-b from-white to-[#FBFCFF] border-b border-[#E6E6E6] px-[20px] sm:px-[32px] py-[14px] flex items-center justify-center gap-[6px]">
        <div className="h-[5px] rounded-[100px] transition-all duration-300 bg-[#387DFF] w-[38px]"></div>
        <div className="h-[5px] rounded-[100px] transition-all duration-300 bg-[#387DFF] w-[38px]"></div>
        <div className="h-[5px] rounded-[100px] transition-all duration-300 bg-[#0047CC] w-[64px]"></div>
        <div className="h-[5px] rounded-[100px] transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
        <div className="h-[5px] rounded-[100px] transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
      </div>

      {/* Main Content */}
      <main className="max-w-[780px] w-full mx-auto px-[20px] sm:px-[28px] pt-[36px] pb-[100px] flex-1">
        
        <div className="mb-[14px]">
          <Tag 
            variant="blue-soft"
            className="uppercase font-[800] tracking-[0.7px] px-[12px] py-[5px]"
            label={
              <span>
                Best and worst moves
              </span>
            }
          />
        </div>

        <h1 className="text-[22px] font-[900] text-[#1A1A1A] tracking-[-0.3px] leading-[1.3] mb-[8px]">
          Two ends of the same scale
        </h1>
        <p className="text-[14px] text-[#808080] leading-[1.6] mb-[24px]">
          For the situation below, mark the response you&apos;d most likely take, and the one you&apos;d be most likely to avoid.
        </p>

        {/* Why this matters */}
        <div className="bg-[#EBF6FF] rounded-[8px] p-[12px_14px] flex gap-[10px] mb-[22px]">
          <svg className="w-[16px] h-[16px] text-[#0047CC] shrink-0 mt-[1px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" strokeLinecap="round"/>
          </svg>
          <p className="text-[12.5px] text-[#182348] leading-[1.5]">
            <strong className="font-[800]">Why this matters · </strong>Knowing what to do and knowing what not to do are different signals. We&apos;re interested in both.
          </p>
        </div>

        {/* Scenario */}
        <div className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[18px] p-[24px_26px] mb-[22px]">
          <div className="text-[11px] font-[800] tracking-[0.7px] uppercase text-[#0047CC] mb-[10px]">
            The situation
          </div>
          <p className="text-[15px] text-[#1A1A1A] leading-[1.75] font-[400]">
            A donor representative visiting your project site asks pointed questions about the gap between your headline coverage figures and what they&apos;ve just seen on the ground. The numbers in your last quarterly report were technically accurate but presented in a way that flatters the programme. The country director is sitting beside you.
          </p>
        </div>

        <p className="text-[16px] font-[800] text-[#1A1A1A] leading-[1.45] mb-[6px]">
          Mark the most appropriate and the least appropriate response.
        </p>
        <p className="text-[13px] text-[#808080] leading-[1.55] mb-[16px]">
          One of each. You can change your picks before continuing.
        </p>

        {/* Legend */}
        <div className="flex gap-[18px] mb-[16px] flex-wrap">
          <div className="flex items-center gap-[7px] text-[12px] font-[700] text-[#4A4A4A]">
            <div className="w-[18px] h-[18px] rounded-full bg-[#0047CC] flex items-center justify-center text-white text-[10px] font-[900]">✓</div>
            Most appropriate
          </div>
          <div className="flex items-center gap-[7px] text-[12px] font-[700] text-[#4A4A4A]">
            <div className="w-[18px] h-[18px] rounded-full bg-[#DC3545] flex items-center justify-center text-white text-[10px] font-[900]">✕</div>
            Least appropriate
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-[10px] mb-[24px]">
          {options.map((opt) => (
            <OptionCard 
              key={opt.id}
              letter={opt.letter}
              text={opt.text}
              isBest={bestPick === opt.id}
              isWorst={worstPick === opt.id}
              onSelectBest={() => handleSelectBest(opt.id)}
              onSelectWorst={() => handleSelectWorst(opt.id)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-[10px] border-t border-[#E6E6E6] px-[20px] sm:px-[32px] py-[14px] flex items-center justify-between gap-[12px] z-[50]">
        <div className="text-[13px] text-[#808080] font-[600] hidden sm:block">
          Scenario 3 of 5 · Stage 1
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[10px] w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            onClick={handleSave}
            className="bg-white text-[#4A4A4A] border-[1.5px] border-[#E6E6E6] rounded-[10px] px-[18px] py-[11px] text-[13.5px] font-[700] hover:border-[#ADADAD] hover:bg-white w-full sm:w-auto"
            fullWidth={false}
          >
            Save & finish later
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={!isComplete}
            className={`rounded-[10px] px-[24px] py-[12px] transition-all font-sans inline-flex items-center justify-center gap-[8px] text-[14px] font-[700] border-none w-full sm:w-auto ${
              isComplete 
                ? 'bg-[#0047CC] text-white shadow-[0_4px_14px_rgba(0,71,204,0.28)] hover:bg-[#344DA1]' 
                : 'bg-[#E6E6E6] text-[#ADADAD] cursor-not-allowed'
            }`}
            fullWidth={false}
          >
            Continue
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default RoleAssessmentSessionTwoBestWorst;
