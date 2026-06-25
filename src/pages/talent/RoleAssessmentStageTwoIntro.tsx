import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import AssessmentHeader from '../../components/talent/AssessmentHeader';
import StageRail from '../../components/talent/StageRail';
import PartRail from '../../components/talent/PartRail';

const HelpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
  </svg>
);

const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 8h10M9 4l4 4-4 4"/>
  </svg>
);

const RoleAssessmentStageTwoIntro: React.FC = () => {
  const navigate = useNavigate();
  const { roleSlug = '' } = useParams<{ roleSlug: string }>();
  const hasUnlockedPart3 = localStorage.getItem('vora_stage2_part3_unlocked') === 'true';
  const hasUnlockedPart2 = localStorage.getItem('vora_stage2_part2_unlocked') === 'true';

  useEffect(() => {
    localStorage.setItem('vora_stage2_unlocked', 'true');
    
    // Redirect if they have already unlocked Part 2 or Part 3
    if (hasUnlockedPart3) {
      navigate(`/onboarding/talent/${roleSlug}/assessment/stage-2/part-3/intro`, { replace: true });
    } else if (hasUnlockedPart2) {
      navigate(`/onboarding/talent/${roleSlug}/assessment/stage-2/part-2/interview-1`, { replace: true });
    }
  }, [hasUnlockedPart2, hasUnlockedPart3, navigate, roleSlug]);

  const handleBegin = () => {
    toast.success('Starting Stage 2 Part 1...');
    navigate(`/onboarding/talent/${roleSlug}/assessment/stage-2/part-1/interview-1`);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#1A1A1A] font-sans flex flex-col">
      <style>{`
        .illo {
          width: 84px;
          height: 84px;
          border-radius: 24px;
          background: linear-gradient(135deg, #EBF6FF, #fff);
          border: 1.5px solid #EBF6FF;
          margin: 0 auto 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .illo::after {
          content: '';
          position: absolute;
          inset: -4px;
          border: 1.5px dashed #387DFF;
          border-radius: 28px;
          opacity: 0.4;
          animation: spin 18s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Top Bar */}
      <AssessmentHeader
        middleContent={
          <>
            Stage 2 <span className="text-[#ADADAD]">·</span> Professional dimension
          </>
        }
        rightContent={
          <div className="flex items-center gap-[6px] text-[12px] text-[#808080] font-[600]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0047CC" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Auto-saved
          </div>
        }
      />

      {/* Stage Rail */}
      <StageRail activeStage={2} />

      {/* Part Rail */}
      <PartRail activePart={1} />

      {/* Wrapping Content */}
      <div className="flex-1 flex items-center justify-center p-[40px_24px]">
        <div className="bg-white rounded-[24px] border border-[#E6E6E6] max-w-[580px] w-full p-[44px_44px_36px] text-center animate-[fadeUp_0.5s_ease_both] relative overflow-hidden">
          
          <div className="illo">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#0047CC" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          </div>

          <div className="text-[11px] font-[800] text-[#0047CC] tracking-[1.4px] uppercase mb-[10px]">
            About Part 1 of 3
          </div>
          <h1 className="text-[24px] font-[900] tracking-[-0.4px] text-[#1A1A1A] mb-[12px] leading-[1.25]">
            The knowledge you carry
          </h1>
          <p className="text-[15px] text-[#4A4A4A] leading-[1.65] mb-[24px]">
            Three short interviews on the foundational knowledge a Senior Health Programme Officer at Reach Africa draws on every day. Each interview is timed individually and is shaped by your background.
          </p>

          {/* Why Section */}
          <div className="bg-[#EBF6FF] rounded-[12px] p-[14px_16px] text-left mb-[22px] flex gap-[11px]">
            <HelpIcon className="w-[18px] h-[18px] text-[#0047CC] shrink-0 mt-[1px]" />
            <div className="text-[13px] text-[#182348] leading-[1.55]">
              <div className="text-[10.5px] font-[800] tracking-[0.5px] uppercase text-[#0047CC] mb-[3px]">
                Why these three
              </div>
              These three knowledge bases are what Reach Africa team leads need to draw on without hesitation: medication safety on outreach, reading public health figures correctly, and understanding the ethical guardrails programmes operate within.
            </div>
          </div>

          {/* What's Inside Section */}
          <div className="text-left bg-[#F7F7F7] border border-[#E6E6E6] rounded-[12px] p-[16px_18px] mb-[22px]">
            <div className="text-[10.5px] font-[800] tracking-[0.7px] uppercase text-[#808080] mb-[10px]">
              What's inside Part 1
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-[10px] py-[7px] border-b border-[#E6E6E6] text-[13.5px] text-[#1A1A1A] font-[600]">
                <div className="w-[18px] h-[18px] rounded-full bg-[#0047CC] text-white flex items-center justify-center text-[9px] font-[900] shrink-0">1</div>
                <div className="flex-1">Pharmacology in the field</div>
                <div className="text-[11.5px] text-[#808080] font-[600]">10 min</div>
              </div>
              <div className="flex items-center gap-[10px] py-[7px] border-b border-[#E6E6E6] text-[13.5px] text-[#1A1A1A] font-[600]">
                <div className="w-[18px] h-[18px] rounded-full bg-[#0047CC] text-white flex items-center justify-center text-[9px] font-[900] shrink-0">2</div>
                <div className="flex-1">Biostatistics for programme decisions</div>
                <div className="text-[11.5px] text-[#808080] font-[600]">10 min</div>
              </div>
              <div className="flex items-center gap-[10px] py-[7px] text-[13.5px] text-[#1A1A1A] font-[600]">
                <div className="w-[18px] h-[18px] rounded-full bg-[#0047CC] text-white flex items-center justify-center text-[9px] font-[900] shrink-0">3</div>
                <div className="flex-1">Compliance and ethics in health programmes</div>
                <div className="text-[11.5px] text-[#808080] font-[600]">10 min</div>
              </div>
            </div>
          </div>

          {/* Facts Grid */}
          <div className="grid grid-cols-3 gap-[10px] mb-[24px]">
            <div className="border border-[#E6E6E6] rounded-[10px] p-[11px_10px] text-center bg-white">
              <div className="text-[14px] font-[900] text-[#1A1A1A] leading-[1.2]">~30</div>
              <div className="text-[10.5px] text-[#808080] font-[600] mt-[3px] leading-[1.3]">minutes</div>
            </div>
            <div className="border border-[#E6E6E6] rounded-[10px] p-[11px_10px] text-center bg-white">
              <div className="text-[14px] font-[900] text-[#1A1A1A] leading-[1.2]">3</div>
              <div className="text-[10.5px] text-[#808080] font-[600] mt-[3px] leading-[1.3]">timed interviews</div>
            </div>
            <div className="border border-[#E6E6E6] rounded-[10px] p-[11px_10px] text-center bg-white">
              <div className="text-[14px] font-[900] text-[#1A1A1A] leading-[1.2]">Pause</div>
              <div className="text-[10.5px] text-[#808080] font-[600] mt-[3px] leading-[1.3]">between any two</div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleBegin}
            className="bg-[#0047CC] text-white border-none rounded-[10px] p-[14px_28px] text-[14px] font-[700] cursor-pointer w-full flex items-center justify-center transition-all shadow-[0_4px_14px_rgba(0,71,204,0.28)] hover:bg-[#344DA1] hover:-translate-y-[1px] hover:shadow-[0_6px_18px_rgba(0,71,204,0.36)] font-sans"
          >
            Begin Interview 1 of 3
          </button>
          
          <p className="text-[12px] text-[#808080] mt-[14px] leading-[1.5]">
            <strong>Heads up:</strong> the timer starts when you tap continue. Switching tabs without saving will auto-submit.
          </p>

        </div>
      </div>
    </div>
  );
};

export default RoleAssessmentStageTwoIntro;
