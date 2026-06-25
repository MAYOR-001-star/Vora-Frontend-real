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
  id: string;
  text: string;
  selected: boolean;
  onClick: () => void;
}

const OptionCard: React.FC<OptionProps> = ({ text, selected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer border-[1.5px] rounded-[14px] p-[16px_18px] bg-white flex gap-[14px] items-start transition-all duration-150 ${
        selected 
          ? 'border-[#0047CC] bg-[#EBF6FF] shadow-[0_0_0_3px_rgba(0,71,204,0.1)]' 
          : 'border-[#E6E6E6] hover:border-[#387DFF] hover:bg-[#EBF6FF]'
      }`}
    >
      {/* Checkbox */}
      <div 
        className={`shrink-0 w-[24px] h-[24px] rounded-[7px] border-[1.5px] flex items-center justify-center transition-all duration-150 mt-[1px] ${
          selected 
            ? 'bg-[#0047CC] border-[#0047CC]' 
            : 'bg-white border-[#E6E6E6]'
        }`}
      >
        <svg 
          className={`w-[14px] h-[14px] text-white transition-opacity duration-150 ${selected ? 'opacity-100' : 'opacity-0'}`} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3.5"
        >
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      {/* Text */}
      <div className="flex-1 text-[14.5px] text-[#1A1A1A] font-[500] leading-[1.55]">
        {text}
      </div>
    </div>
  );
};

const RoleAssessmentSessionTwoCombine: React.FC = () => {
  const navigate = useNavigate();
  const { roleSlug = '' } = useParams<{ roleSlug: string }>();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleContinue = () => {
    navigate(`/onboarding/talent/${roleSlug}/assessment/session-2/tradeoff`);
  };

  const handleSave = () => {
    toast.success('Saved. You can return anytime within 48 hours.');
  };

  const selectedCount = selectedIds.length;
  const isComplete = selectedCount >= 2 && selectedCount <= 5;

  const options = [
    {
      id: 'a',
      text: 'Schedule a private check-in that isn\'t framed as a performance review just a conversation about how she\'s doing.'
    },
    {
      id: 'b',
      text: 'Quietly redistribute her two most demanding deliverables to other team members for the next two weeks.'
    },
    {
      id: 'c',
      text: 'Remind her, gently but clearly, that the team is depending on her and that the recent slip in standards has been noticed.'
    },
    {
      id: 'd',
      text: 'Share the staff wellbeing resources available through the organisation and offer to help her access them.'
    },
    {
      id: 'e',
      text: 'Loop in HR proactively so a formal record exists if things don\'t improve.'
    },
    {
      id: 'f',
      text: 'Wait another two weeks and see whether the situation resolves itself before doing anything.'
    },
    {
      id: 'g',
      text: 'Pair her on her next field visit with a calm, senior colleague who can quietly read the situation and feed back to you.'
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
        <div className="h-[5px] rounded-[100px] transition-all duration-300 bg-[#387DFF] w-[38px]"></div>
        <div className="h-[5px] rounded-[100px] transition-all duration-300 bg-[#0047CC] w-[64px]"></div>
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
                The moves you&apos;d combine
              </span>
            }
          />
        </div>

        <h1 className="text-[22px] font-[900] text-[#1A1A1A] tracking-[-0.3px] leading-[1.3] mb-[8px]">
          A team member is quietly burning out
        </h1>
        <p className="text-[14px] text-[#808080] leading-[1.6] mb-[24px]">
          Pick every action you&apos;d take in the first two weeks. Real situations rarely need just one move.
        </p>

        {/* Why this matters */}
        <div className="bg-[#EBF6FF] rounded-[8px] p-[12px_14px] flex gap-[10px] mb-[22px]">
          <svg className="w-[16px] h-[16px] text-[#0047CC] shrink-0 mt-[1px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" strokeLinecap="round"/>
          </svg>
          <p className="text-[12.5px] text-[#182348] leading-[1.5]">
            <strong className="font-[800]">Why this matters · </strong>People management is rarely a single intervention. The combination you choose tells us how you balance care, accountability and delivery.
          </p>
        </div>

        {/* Scenario */}
        <div className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[18px] p-[24px_26px] mb-[22px]">
          <div className="text-[11px] font-[800] tracking-[0.7px] uppercase text-[#0047CC] mb-[10px]">
            The situation
          </div>
          <p className="text-[15px] text-[#1A1A1A] leading-[1.75] font-[400]">
            A field officer who used to be one of your strongest performers has gone quiet over the past month. She&apos;s missed two community meetings, her last two reports were thin, and she&apos;s been increasingly short with the local volunteers. In a recent one-to-one she insisted everything was fine. You&apos;ve heard informally that her mother has been unwell.
          </p>
        </div>

        <p className="text-[16px] font-[800] text-[#1A1A1A] leading-[1.45] mb-[6px]">
          Which actions would you take? Pick all that apply.
        </p>
        <p className="text-[13px] text-[#808080] leading-[1.55] mb-[16px]">
          Select between 2 and 5.
        </p>

        {/* Counter */}
        <div className="inline-flex items-center gap-[8px] bg-[#F7F7F7] rounded-[100px] padding-[6px_12px] p-[6px_12px] text-[12px] font-[700] text-[#4A4A4A] mb-[14px]">
          <span>Selected: <strong className="text-[#0047CC] font-[700]">{selectedCount}</strong> of 5</span>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-[10px] mb-[24px]">
          {options.map((opt) => (
            <OptionCard 
              key={opt.id}
              id={opt.id}
              text={opt.text}
              selected={selectedIds.includes(opt.id)}
              onClick={() => handleToggle(opt.id)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-[10px] border-t border-[#E6E6E6] px-[20px] sm:px-[32px] py-[14px] flex items-center justify-between gap-[12px] z-[50]">
        <div className="text-[13px] text-[#808080] font-[600] hidden sm:block">
          Scenario 4 of 5 · Stage 1
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

export default RoleAssessmentSessionTwoCombine;
