import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import VoraLogo from '../../components/common/VoraLogo';
import Button from '../../components/common/Button';
import Tag from '../../components/common/Tag';

const DocumentCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
  </svg>
);

const InfoCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
  </svg>
);

const GripIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="9" cy="6" r="1.5" /><circle cx="9" cy="12" r="1.5" /><circle cx="9" cy="18" r="1.5" />
    <circle cx="15" cy="6" r="1.5" /><circle cx="15" cy="12" r="1.5" /><circle cx="15" cy="18" r="1.5" />
  </svg>
);

const INITIAL_RANK_ITEMS = [
  { id: '1', text: "Doing work that has a tangible impact on people's lives" },
  { id: '2', text: "Autonomy to design how I approach my own work" },
  { id: '3', text: "A team where I learn from people more experienced than me" },
  { id: '4', text: "Recognition and clear paths to senior responsibility" },
  { id: '5', text: "Stability a predictable workload and reliable income" },
  { id: '6', text: "Work that lets me grow into a recognised expert in my field" },
];

const RoleAssessmentSessionPsychometricValues: React.FC = () => {
  const navigate = useNavigate();
  const { roleSlug } = useParams<{ roleSlug: string }>();

  // Drag and drop ranking state
  const [rankItems, setRankItems] = useState(INITIAL_RANK_ITEMS);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Forced choice state
  const [fc1, setFc1] = useState<string | null>(null);
  const [fc2, setFc2] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    // Required for Firefox
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', e.currentTarget.outerHTML);
    }
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    setRankItems(prev => {
      const items = [...prev];
      const draggedItem = items[draggedIndex];
      items.splice(draggedIndex, 1);
      items.splice(index, 0, draggedItem);
      setDraggedIndex(index);
      return items;
    });
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const isComplete = fc1 !== null && fc2 !== null;

  const handleContinue = () => {
    navigate(`/onboarding/talent/${roleSlug}/assessment/session-1/situational`);
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
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#387DFF] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#387DFF] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#0047CC] w-[64px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1000px] w-full mx-auto px-[32px] pt-[48px] pb-[120px] flex-1">
        <div className="mb-[14px]">
          <Tag 
            variant="blue-soft"
            className="uppercase font-[800] tracking-[0.7px] px-[12px] py-[5px]"
            label={
              <span className="flex items-center gap-[7px]">
                <StarIcon className="w-[12px] h-[12px]" />
                Part 3 · What matters to you
              </span>
            }
          />
        </div>
        <h1 className="text-[22px] font-[700] text-[#1A1A1A] tracking-[-0.3px] leading-[1.3] mb-[8px]">
          Different things motivate different people. Tell us what matters to you.
        </h1>
        <p className="text-[14px] text-[#808080] leading-[1.6] mb-[24px]">
          Drag to put these in the order that reflects what you genuinely value at work not what sounds most professional.
        </p>

        <div className="flex gap-[10px] items-start mb-[30px] text-[12.5px] text-[#182348] leading-[1.5]">
          <InfoCircleIcon className="w-[15px] h-[15px] text-[#0047CC] shrink-0 mt-[1px]" />
          <div>
            <strong className="font-[800]">Why this matters:</strong> Teams perform better when individual values align with the work. This is for finding fit, not filtering people out.
          </div>
        </div>

        {/* Rank Card */}
        <div className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[18px] p-[24px_26px] mb-[24px]">
          <div className="text-[15.5px] font-[700] text-[#1A1A1A] leading-[1.5] mb-[6px]">
            Rank these in order of what matters most to you in a job.
          </div>
          <div className="text-[12.5px] text-[#808080] mb-[18px]">
            Drag and drop items to reorder them. Items at the top of the list are considered the highest priority
          </div>
          <div className="flex flex-col gap-[10px]">
            {rankItems.map((item, idx) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-[12px] bg-white border-[1.5px] border-[#E6E6E6] rounded-[12px] p-[14px_16px] cursor-grab select-none transition-all duration-200 hover:border-[#387DFF] hover:bg-[#EBF6FF] ${draggedIndex === idx ? 'opacity-50' : ''}`}
              >
                <div className="w-[30px] h-[30px] rounded-full bg-[#EBF6FF] text-[#0047CC] flex items-center justify-center text-[13px] font-[900] shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 text-[14.5px] font-[600] text-[#1A1A1A] leading-[1.45]">
                  {item.text}
                </div>
                <div className="text-[#ADADAD] flex shrink-0">
                  <GripIcon className="w-[18px] h-[18px]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Forced Choice 1 */}
        <div className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[18px] p-[24px_26px] mb-[24px]">
          <div className="text-[15.5px] font-[700] text-[#1A1A1A] leading-[1.5] mb-[18px]">
            If you had to pick one, which describes you better?
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
            <div
              onClick={() => setFc1('A')}
              className={`cursor-pointer border-[1.5px] rounded-[14px] p-[18px] transition-all duration-150 text-left hover:border-[#387DFF] ${fc1 === 'A' ? 'border-[#0047CC] shadow-[0_0_0_3px_rgba(0,71,204,0.1)]' : 'border-[#E6E6E6] bg-white'}`}
            >
              <div className={`inline-flex items-center justify-center w-[24px] h-[24px] rounded-full text-[11px] font-[900] mb-[10px] ${fc1 === 'A' ? 'bg-[#0047CC] text-white' : 'bg-[#F7F7F7] text-[#808080]'}`}>
                A
              </div>
              <div className="text-[14px] text-[#1A1A1A] font-[600] leading-[1.5]">
                I prefer one big project I can shape from start to finish.
              </div>
            </div>
            <div
              onClick={() => setFc1('B')}
              className={`cursor-pointer border-[1.5px] rounded-[14px] p-[18px] transition-all duration-150 text-left hover:border-[#387DFF] ${fc1 === 'B' ? 'border-[#0047CC] shadow-[0_0_0_3px_rgba(0,71,204,0.1)]' : 'border-[#E6E6E6] bg-white'}`}
            >
              <div className={`inline-flex items-center justify-center w-[24px] h-[24px] rounded-full text-[11px] font-[900] mb-[10px] ${fc1 === 'B' ? 'bg-[#0047CC] text-white' : 'bg-[#F7F7F7] text-[#808080]'}`}>
                B
              </div>
              <div className="text-[14px] text-[#1A1A1A] font-[600] leading-[1.5]">
                I prefer running several smaller things in parallel.
              </div>
            </div>
          </div>
        </div>

        {/* Forced Choice 2 */}
        <div className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[18px] p-[24px_26px] mb-[24px]">
          <div className="text-[15.5px] font-[700] text-[#1A1A1A] leading-[1.5] mb-[18px]">
            And which of these feels closer to you?
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
            <div
              onClick={() => setFc2('A')}
              className={`cursor-pointer border-[1.5px] rounded-[14px] p-[18px] transition-all duration-150 text-left hover:border-[#387DFF] ${fc2 === 'A' ? 'border-[#0047CC] shadow-[0_0_0_3px_rgba(0,71,204,0.1)]' : 'border-[#E6E6E6] bg-white'}`}
            >
              <div className={`inline-flex items-center justify-center w-[24px] h-[24px] rounded-full text-[11px] font-[900] mb-[10px] ${fc2 === 'A' ? 'bg-[#0047CC] text-white' : 'bg-[#F7F7F7] text-[#808080]'}`}>
                A
              </div>
              <div className="text-[14px] text-[#1A1A1A] font-[600] leading-[1.5]">
                I'd take a lower-paid role if the mission was something I cared about deeply.
              </div>
            </div>
            <div
              onClick={() => setFc2('B')}
              className={`cursor-pointer border-[1.5px] rounded-[14px] p-[18px] transition-all duration-150 text-left hover:border-[#387DFF] ${fc2 === 'B' ? 'border-[#0047CC] shadow-[0_0_0_3px_rgba(0,71,204,0.1)]' : 'border-[#E6E6E6] bg-white'}`}
            >
              <div className={`inline-flex items-center justify-center w-[24px] h-[24px] rounded-full text-[11px] font-[900] mb-[10px] ${fc2 === 'B' ? 'bg-[#0047CC] text-white' : 'bg-[#F7F7F7] text-[#808080]'}`}>
                B
              </div>
              <div className="text-[14px] text-[#1A1A1A] font-[600] leading-[1.5]">
                I want my financial stability sorted first; mission alignment matters but isn't the deciding factor.
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer CTA */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-[10px] border-t border-[#E6E6E6] px-[32px] py-[14px] flex flex-wrap items-center justify-between gap-[12px] z-[50]">
        <div className="text-[13px] text-[#808080] font-[600]">
          Part 3 of 6 · Stage 1
        </div>
        <div className="flex items-center gap-[10px]">
          <Button
            variant="outline"
            fullWidth={false}
            onClick={() => toast.success('Saved. You can return anytime within 48 hours.')}
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

export default RoleAssessmentSessionPsychometricValues;
