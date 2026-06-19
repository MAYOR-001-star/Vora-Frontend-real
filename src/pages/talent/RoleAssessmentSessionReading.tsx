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

const ReadingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
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
      className={`cursor-pointer border-[1.5px] rounded-[10px] p-[12px_14px] bg-white flex gap-[11px] items-center transition-all duration-150 ${selected ? 'border-[#0047CC] bg-[#EBF6FF] shadow-[0_0_0_3px_rgba(0,71,204,0.1)]' : 'border-[#E6E6E6] hover:border-[#387DFF] hover:bg-[#EBF6FF]'}`}
    >
      <div className={`shrink-0 w-[24px] h-[24px] rounded-full border-[1.5px] flex items-center justify-center text-[11px] font-[900] transition-colors ${selected ? 'bg-[#0047CC] border-[#0047CC] text-white' : 'bg-white border-[#E6E6E6] text-[#ADADAD]'}`}>
        {letter}
      </div>
      <div className="text-[14px] text-[#1A1A1A] leading-[1.4] font-[600]">
        {text}
      </div>
    </div>
  );
};

const RoleAssessmentSessionReading: React.FC = () => {
  const navigate = useNavigate();
  const { roleSlug } = useParams<{ roleSlug: string }>();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (qId: string, optId: string) => {
    setAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === 3; // Three questions

  const handleContinue = () => {
    navigate(`/onboarding/talent/${roleSlug}/assessment/session-1/complete`); 
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
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#387DFF] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#387DFF] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#387DFF] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#0047CC] w-[64px]"></div>
      </div>

      {/* Main Content */}
      <main className="max-w-[780px] w-full mx-auto px-[20px] sm:px-[28px] pt-[36px] pb-[100px] flex-1">
        
        <div className="mb-[14px]">
          <Tag 
            variant="blue-soft"
            className="uppercase font-[800] tracking-[0.7px] px-[12px] py-[5px]"
            label={
              <span className="flex items-center gap-[7px]">
                <ReadingIcon className="w-[12px] h-[12px]" />
                Part 6 · Reading carefully
              </span>
            }
          />
        </div>
        
        <h1 className="text-[22px] font-[900] text-[#1A1A1A] tracking-[-0.3px] leading-[1.3] mb-[8px]">
          Read the passage, then answer based only on what it actually says.
        </h1>
        <p className="text-[14px] text-[#808080] leading-[1.6] mb-[24px]">
          If the passage doesn't say it, don't assume it even if you think you already know the topic. This is the last part of stage 1.
        </p>

        {/* Passage */}
        <div className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[18px] p-[24px_28px] mb-[24px]">
          <div className="text-[11px] font-[800] tracking-[0.7px] uppercase text-[#0047CC] mb-[10px]">
            Passage
          </div>
          <div className="text-[15px] text-[#1A1A1A] leading-[1.75] font-[400] space-y-[12px]">
            <p>
              A 2023 review of community-based maternal health programmes across four sub-Saharan countries reported that outreach models combining mobile clinics with community health volunteer (CHV) follow-up achieved antenatal attendance rates more than twice as high as static clinic models alone. However, the same review noted that the gains were strongest in semi-urban settings and weakest in remote rural communities, where transport infrastructure remained the binding constraint.
            </p>
            <p>
              The authors emphasised that the success of mobile-plus-CHV models depended less on technology investment and more on the recruitment, training, and ongoing supervision of CHVs themselves. Programmes that under-invested in CHV supervision saw attendance gains plateau within 18 months. Programmes that maintained quarterly CHV refresher training sustained gains beyond three years.
            </p>
          </div>
        </div>

        {/* Question 1 */}
        <div className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[14px] p-[20px_22px] mb-[14px]">
          <div className="text-[11px] font-[800] text-[#ADADAD] tracking-[0.5px] uppercase mb-[8px]">Question 1</div>
          <p className="text-[15.5px] font-[700] text-[#1A1A1A] leading-[1.5] mb-[14px]">
            Based only on the passage, which of the following can be confidently inferred?
          </p>
          <div className="flex flex-col gap-[8px]">
            <OptionCard letter="A" text="Mobile clinics are universally more effective than static clinics in sub-Saharan Africa." selected={answers['q1'] === 'A'} onClick={() => handleAnswer('q1', 'A')} />
            <OptionCard letter="B" text="The model worked best where CHV supervision was sustained over time." selected={answers['q1'] === 'B'} onClick={() => handleAnswer('q1', 'B')} />
            <OptionCard letter="C" text="Technology investment was the main driver of programme success." selected={answers['q1'] === 'C'} onClick={() => handleAnswer('q1', 'C')} />
            <OptionCard letter="D" text="Remote rural communities don't benefit from outreach programmes." selected={answers['q1'] === 'D'} onClick={() => handleAnswer('q1', 'D')} />
          </div>
        </div>

        {/* Question 2 */}
        <div className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[14px] p-[20px_22px] mb-[14px]">
          <div className="text-[11px] font-[800] text-[#ADADAD] tracking-[0.5px] uppercase mb-[8px]">Question 2</div>
          <p className="text-[15.5px] font-[700] text-[#1A1A1A] leading-[1.5] mb-[14px]">
            If a new programme replicates the model but plans to fund CHV training only once at launch, what does the passage suggest is most likely?
          </p>
          <div className="flex flex-col gap-[8px]">
            <OptionCard letter="A" text="Sustained gains beyond three years." selected={answers['q2'] === 'A'} onClick={() => handleAnswer('q2', 'A')} />
            <OptionCard letter="B" text="Faster attendance growth than peer programmes." selected={answers['q2'] === 'B'} onClick={() => handleAnswer('q2', 'B')} />
            <OptionCard letter="C" text="Attendance gains plateauing within roughly 18 months." selected={answers['q2'] === 'C'} onClick={() => handleAnswer('q2', 'C')} />
            <OptionCard letter="D" text="The passage doesn't give enough information to say." selected={answers['q2'] === 'D'} onClick={() => handleAnswer('q2', 'D')} />
          </div>
        </div>

        {/* Question 3 */}
        <div className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[14px] p-[20px_22px] mb-[14px]">
          <div className="text-[11px] font-[800] text-[#ADADAD] tracking-[0.5px] uppercase mb-[8px]">Question 3</div>
          <p className="text-[15.5px] font-[700] text-[#1A1A1A] leading-[1.5] mb-[14px]">
            According to the passage, what was the binding constraint in remote rural communities?
          </p>
          <div className="flex flex-col gap-[8px]">
            <OptionCard letter="A" text="Insufficient government funding." selected={answers['q3'] === 'A'} onClick={() => handleAnswer('q3', 'A')} />
            <OptionCard letter="B" text="Transport infrastructure." selected={answers['q3'] === 'B'} onClick={() => handleAnswer('q3', 'B')} />
            <OptionCard letter="C" text="Lack of CHV training programmes." selected={answers['q3'] === 'C'} onClick={() => handleAnswer('q3', 'C')} />
            <OptionCard letter="D" text="Resistance from local communities." selected={answers['q3'] === 'D'} onClick={() => handleAnswer('q3', 'D')} />
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-[10px] border-t border-[#E6E6E6] px-[20px] sm:px-[32px] py-[14px] flex items-center justify-between gap-[12px] z-[50]">
        <div className="text-[13px] text-[#808080] font-[600] hidden sm:block">
          Part 6 of 6 · Stage 1
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
            Finish this session
            <ArrowRightIcon className="w-[14px] h-[14px]" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default RoleAssessmentSessionReading;
