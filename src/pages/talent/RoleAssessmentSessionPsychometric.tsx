import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const BrainSmallIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M12 2a4 4 0 0 0-4 4c0 1 .3 1.8.8 2.5C7.2 9.4 6 11.1 6 13a6 6 0 0 0 12 0c0-1.9-1.2-3.6-2.8-4.5.5-.7.8-1.5.8-2.5a4 4 0 0 0-4-4z"/>
  </svg>
);

const InfoCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8v4M12 16h.01" strokeLinecap="round"/>
  </svg>
);

type LikertOption = 1 | 2 | 3 | 4 | 5;

interface StatementProps {
  num: string;
  text: string;
  value?: LikertOption;
  onChange: (val: LikertOption) => void;
}

const StatementBlock: React.FC<StatementProps> = ({ num, text, value, onChange }) => {
  const isAnswered = value !== undefined;
  
  return (
    <div className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[16px] p-[24px_26px] mb-[18px] transition-colors duration-200">
      <div className="text-[11px] font-[800] text-[#ADADAD] tracking-[0.5px] uppercase mb-[8px]">{num}</div>
      <div className="text-[16px] font-[600] text-[#1A1A1A] leading-[1.55] mb-[20px]">{text}</div>
      
      <div className="flex flex-col md:flex-row gap-[8px]">
        {[
          { val: 1, label: 'Strongly disagree' },
          { val: 2, label: 'Disagree' },
          { val: 3, label: 'Neutral' },
          { val: 4, label: 'Agree' },
          { val: 5, label: 'Strongly agree' },
        ].map((opt) => {
          const selected = value === opt.val;
          return (
            <div 
              key={opt.val} 
              onClick={() => onChange(opt.val as LikertOption)}
              className={`flex-1 cursor-pointer border-[1.5px] rounded-[12px] py-[12px] px-[16px] md:px-[4px] bg-white transition-all duration-150 flex flex-row items-center justify-start md:justify-center gap-[12px] hover:border-[#387DFF] ${selected ? 'border-[#0047CC] bg-[#EBF6FF] shadow-[0_0_0_3px_rgba(0,71,204,0.1)]' : 'border-[#E6E6E6]'}`}
            >
              <div className={`w-[16px] h-[16px] shrink-0 rounded-full border-[2px] transition-all duration-150 flex items-center justify-center ${selected ? 'border-[#0047CC] bg-[#0047CC]' : 'border-[#E6E6E6] bg-white'}`}>
                {selected && <div className="w-[5px] h-[5px] rounded-full bg-white"></div>}
              </div>
              <div className="text-[13px] md:text-[11px] font-[700] text-[#4A4A4A] leading-[1.25] text-left">
                {opt.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RoleAssessmentSessionPsychometric: React.FC = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, LikertOption>>({});

  const handleAnswer = (qNum: number, val: LikertOption) => {
    setAnswers(prev => ({ ...prev, [qNum]: val }));
  };

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === 5;

  const { roleSlug } = useParams<{ roleSlug: string }>();

  const handleContinue = () => {
    navigate(`/onboarding/talent/${roleSlug}/assessment/session-1/forced-choice`);
  };

  const handleSave = () => {
    toast.success('Saved. You can return anytime within 48 hours.');
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#1A1A1A] font-sans flex flex-col relative pb-[80px]">
      {/* Top Bar */}
      <header className="bg-white/95 backdrop-blur-[10px] border-b border-[#E6E6E6] px-[32px] py-[14px] flex items-center justify-between sticky top-0 z-[50]">
        <span className="inline-flex items-center gap-[1px] text-[#0047CC]">
          <VoraLogo size="sm" to="/dashboard" />
        </span>
        <div className="text-[12.5px] text-[#808080] font-[600] text-center hidden sm:block">
          Stage 1 · Getting to know you
        </div>
        <div className="flex items-center gap-[6px] text-[12px] text-[#808080] font-[600]">
          <div className="w-[16px] h-[16px] rounded-full border border-[#0047CC] bg-white flex items-center justify-center">
            <DocumentCheckIcon className="w-[9px] h-[9px] text-[#0047CC]" />
          </div>
          Auto-saved
        </div>
      </header>

      {/* Chapter Rail */}
      <div className="bg-white border-b border-[#E6E6E6] px-[32px] py-[12px] flex items-center justify-center gap-[12px]">
        <div className="flex items-center gap-[7px]">
          <div className="w-[18px] h-[18px] rounded-full bg-[#0047CC] shadow-[0_0_0_4px_rgba(0,71,204,0.12)] flex items-center justify-center text-[9px] font-[800] text-white">1</div>
          <div className="text-[11.5px] font-[700] text-[#0047CC]">How you think</div>
        </div>
        <div className="w-[36px] h-[2px] bg-[#E6E6E6] rounded-[2px]"></div>
        <div className="flex items-center gap-[7px]">
          <div className="w-[18px] h-[18px] rounded-full bg-[#E6E6E6] flex items-center justify-center text-[9px] font-[800] text-white">2</div>
          <div className="text-[11.5px] font-[700] text-[#ADADAD]">Your instincts</div>
        </div>
      </div>

      {/* Section Rail Pebbles */}
      <div className="bg-gradient-to-b from-white to-[#FBFCFF] border-b border-[#E6E6E6] px-[32px] py-[14px] flex items-center justify-center gap-[6px]">
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#0047CC] w-[64px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1000px] w-full mx-auto px-[32px] pt-[48px] pb-[120px] flex-1">
        
        <div className="mb-[32px]">
          <div className="mb-[14px]">
            <Tag 
              variant="blue-soft"
              className="uppercase font-[800] tracking-[0.7px] px-[12px] py-[5px]"
              label={
                <span className="flex items-center gap-[7px]">
                  <BrainSmallIcon className="w-[12px] h-[12px]" />
                  Part 1 · How you work
                </span>
              }
            />
          </div>
          <h1 className="text-[22px] font-[700] text-[#1A1A1A] tracking-[-0.3px] leading-[1.3] mb-[8px]">
            A few statements about how you tend to operate at work.
          </h1>
          <p className="text-[14px] text-[#808080] leading-[1.6]">
            Pick the answer that feels most true for you, not the one that sounds best. We're after the honest version.
          </p>
        </div>

        <div className="flex gap-[10px] items-start mb-[32px] text-[12.5px] text-[#182348] leading-[1.5]">
          <InfoCircleIcon className="w-[15px] h-[15px] text-[#0047CC] shrink-0 mt-[1px]" />
          <div>
            <strong className="font-[800]">Why this matters:</strong> Senior programme officers at Reach Africa lead under uncertainty. The team uses this to understand the working style you'd bring not to score you against a profile.
          </div>
        </div>

        <StatementBlock 
          num="Statement 01" 
          text="When a project has competing demands and no clear right answer, I'm usually the one who maps the trade-offs out loud for the team."
          value={answers[1]}
          onChange={(v) => handleAnswer(1, v)}
        />
        
        <StatementBlock 
          num="Statement 02" 
          text="I tend to start tasks well before deadlines, even when nobody is pressing me to."
          value={answers[2]}
          onChange={(v) => handleAnswer(2, v)}
        />

        <StatementBlock 
          num="Statement 03" 
          text="I take feedback from people more junior than me seriously, and act on it when it's right."
          value={answers[3]}
          onChange={(v) => handleAnswer(3, v)}
        />

        <div className="relative text-center my-[32px]">
          <hr className="border-none border-t border-dashed border-[#E6E6E6]" />
          <span className="inline-block bg-[#F7F7F7] px-[12px] text-[#808080] text-[11px] font-[800] tracking-[0.6px] uppercase -mt-[10px] ml-[-24px]">
            A different angle
          </span>
        </div>

        <StatementBlock 
          num="Statement 04" 
          text="Disruptions to a plan, like sudden priority changes or system failures, throw me off for a while before I can recalibrate."
          value={answers[4]}
          onChange={(v) => handleAnswer(4, v)}
        />

        <StatementBlock 
          num="Statement 05" 
          text="I find it easier to keep clarity in my decision-making when information is incomplete than most of my peers."
          value={answers[5]}
          onChange={(v) => handleAnswer(5, v)}
        />

      </main>

      {/* Footer CTA */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-[10px] border-t border-[#E6E6E6] px-[32px] py-[14px] flex flex-wrap items-center justify-between gap-[12px] z-[50]">
        <div className="text-[13px] text-[#808080] font-[600]">
          <strong className="text-[#1A1A1A] font-[800]">{answeredCount}</strong> of 5 answered · Part 1 of 6
        </div>
        <div className="flex items-center gap-[10px]">
          <Button 
            variant="outline"
            fullWidth={false}
            onClick={handleSave}
            className="bg-white text-[#4A4A4A] border-[1.5px] border-[#E6E6E6] rounded-full px-[18px] py-[11px] text-[13.5px] font-[700] hover:border-[#ADADAD] hover:bg-white whitespace-nowrap !min-h-0"
          >
            Save & finish later
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={!isComplete}
            fullWidth={false}
            className={`rounded-full px-[24px] py-[12px] text-[14px] font-[700] flex items-center justify-center transition-all whitespace-nowrap !min-h-0
              ${isComplete 
                ? 'bg-[#0047CC] text-white shadow-[0_4px_14px_rgba(0,71,204,0.28)] hover:bg-[#344DA1] hover:-translate-y-[1px]' 
                : 'bg-[#E6E6E6] text-white cursor-not-allowed shadow-none hover:bg-[#E6E6E6] hover:translate-y-0'
              }`}
          >
            Continue
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default RoleAssessmentSessionPsychometric;
