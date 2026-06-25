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

interface RankItem {
  id: string;
  text: string;
}

const RoleAssessmentSessionTwoRanking: React.FC = () => {
  const navigate = useNavigate();
  const { roleSlug = '' } = useParams<{ roleSlug: string }>();

  const [items, setItems] = useState<RankItem[]>([
    {
      id: 'a',
      text: "Call the nurse privately, explain what's at stake, and ask her to take the post down immediately."
    },
    {
      id: 'b',
      text: "Phone the community elder back, apologise on behalf of the team, and explain the steps being taken to make it right."
    },
    {
      id: 'c',
      text: "Document the incident formally and notify the safeguarding lead so it's logged in line with policy."
    },
    {
      id: 'd',
      text: "Run a brief refresher for the whole field team on consent, dignity, and social-media boundaries."
    }
  ]);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setItems(newItems);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);

    setDraggedIndex(index);
    setItems(newItems);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleContinue = () => {
    navigate(`/onboarding/talent/${roleSlug}/assessment/session-2/best-worst`);
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
        <div className="h-[5px] rounded-[100px] transition-all duration-300 bg-[#0047CC] w-[64px]"></div>
        <div className="h-[5px] rounded-[100px] transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
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
                Ordering the options
              </span>
            }
          />
        </div>

        <h1 className="text-[22px] font-[900] text-[#1A1A1A] tracking-[-0.3px] leading-[1.3] mb-[8px]">
          When you can do everything just not all at once
        </h1>
        <p className="text-[14px] text-[#808080] leading-[1.6] mb-[24px]">
          Order the four actions in the sequence you&apos;d actually take them, from first to last.
        </p>

        {/* Why this matters */}
        <div className="bg-[#EBF6FF] rounded-[8px] p-[12px_14px] flex gap-[10px] mb-[22px]">
          <svg className="w-[16px] h-[16px] text-[#0047CC] shrink-0 mt-[1px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" strokeLinecap="round"/>
          </svg>
          <p className="text-[12.5px] text-[#182348] leading-[1.5]">
            <strong className="font-[800]">Why this matters · </strong>Senior programme work is rarely a single decision; it&apos;s an ordering problem. The sequence you choose says a lot about what you protect first.
          </p>
        </div>

        {/* Scenario */}
        <div className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[18px] p-[24px_26px] mb-[22px]">
          <div className="text-[11px] font-[800] tracking-[0.7px] uppercase text-[#0047CC] mb-[10px]">
            The situation
          </div>
          <p className="text-[15px] text-[#1A1A1A] leading-[1.75] font-[400]">
            A field nurse on your team has, against protocol, posted a photo of an outreach session on her personal social media. One of the women in the background is clearly identifiable. The post has 40 likes already. A community elder has just called the office, upset. The nurse is one of your strongest field staff and is on her first overseas posting.
          </p>
        </div>

        <p className="text-[16px] font-[800] text-[#1A1A1A] leading-[1.45] mb-[6px]">
          What order would you take these actions in?
        </p>
        <p className="text-[13px] text-[#808080] leading-[1.55] mb-[16px]">
          Drag to reorder, or use the up/down arrows. Position 1 happens first.
        </p>

        {/* Drag help */}
        <div className="flex items-center gap-[8px] text-[12.5px] text-[#808080] bg-[#F7F7F7] rounded-[8px] p-[9px_14px] mb-[14px]">
          <svg className="w-[14px] h-[14px] text-[#808080] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
          All four actions must end up in an order before you can continue.
        </div>

        {/* Rank List */}
        <div className="flex flex-col gap-[8px] mb-[24px]">
          {items.map((item, index) => (
            <div 
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-[14px] bg-white border-[1.5px] border-[#E6E6E6] rounded-[14px] p-[14px_16px] transition-all duration-200 cursor-grab active:cursor-grabbing hover:border-[#387DFF] hover:translate-y-[-1px] hover:shadow-[0_6px_16px_rgba(0,71,204,0.06)] ${
                draggedIndex === index ? 'opacity-50 border-dashed border-[#387DFF]' : ''
              }`}
            >
              {/* Position Badge */}
              <div className="shrink-0 w-[34px] h-[34px] rounded-full bg-gradient-to-br from-[#0047CC] to-[#387DFF] text-white flex items-center justify-center text-[13px] font-[900] shadow-[0_4px_10px_rgba(0,71,204,0.2)]">
                {index + 1}
              </div>

              {/* Grip Handle */}
              <svg className="text-[#ADADAD] shrink-0" width="14" height="20" viewBox="0 0 14 20" fill="currentColor">
                <circle cx="4" cy="4" r="1.5"/>
                <circle cx="10" cy="4" r="1.5"/>
                <circle cx="4" cy="10" r="1.5"/>
                <circle cx="10" cy="10" r="1.5"/>
                <circle cx="4" cy="16" r="1.5"/>
                <circle cx="10" cy="16" r="1.5"/>
              </svg>

              {/* Text */}
              <div className="flex-1">
                <div className="text-[14px] text-[#1A1A1A] font-[600] leading-[1.5]">
                  {item.text}
                </div>
              </div>

              {/* Reorder Arrows */}
              <div className="flex flex-col gap-[4px] shrink-0">
                <button 
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveItem(index, 'up')}
                  className="bg-white border border-[#E6E6E6] rounded-[6px] w-[24px] h-[22px] flex items-center justify-center cursor-pointer text-[#808080] hover:bg-[#EBF6FF] hover:text-[#0047CC] hover:border-[#387DFF] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ▲
                </button>
                <button 
                  type="button"
                  disabled={index === items.length - 1}
                  onClick={() => moveItem(index, 'down')}
                  className="bg-white border border-[#E6E6E6] rounded-[6px] w-[24px] h-[22px] flex items-center justify-center cursor-pointer text-[#808080] hover:bg-[#EBF6FF] hover:text-[#0047CC] hover:border-[#387DFF] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ▼
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-[10px] border-t border-[#E6E6E6] px-[20px] sm:px-[32px] py-[14px] flex items-center justify-between gap-[12px] z-[50]">
        <div className="text-[13px] text-[#808080] font-[600] hidden sm:block">
          Scenario 2 of 5 · Stage 1
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
            className="rounded-[10px] px-[24px] py-[12px] transition-all font-sans inline-flex items-center justify-center gap-[8px] text-[14px] font-[700] border-none w-full sm:w-auto bg-[#0047CC] text-white shadow-[0_4px_14px_rgba(0,71,204,0.28)] hover:bg-[#344DA1]"
            fullWidth={false}
          >
            Continue
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default RoleAssessmentSessionTwoRanking;
