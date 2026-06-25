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

const RoleAssessmentSessionTwoTradeoff: React.FC = () => {
  const navigate = useNavigate();
  const { roleSlug = '' } = useParams<{ roleSlug: string }>();

  // State to hold the slider values (each initialized to 50 for "Balanced")
  const [values, setValues] = useState<number[]>([50, 50, 50]);

  const handleSliderChange = (index: number, val: number) => {
    setValues((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const handleFinish = () => {
    navigate(`/onboarding/talent/${roleSlug}/assessment/session-2/review`);
  };

  const handleSave = () => {
    toast.success('Saved. You can return anytime within 48 hours.');
  };

  // Helper to calculate left and width for the track fill starting from the center (50)
  const getFillStyle = (v: number) => {
    if (v < 50) {
      return {
        left: `${v}%`,
        width: `${50 - v}%`,
      };
    } else {
      return {
        left: '50%',
        width: `${v - 50}%`,
      };
    }
  };

  // Helper to map values to the readout label
  const getLabel = (v: number) => {
    if (v < 20) return 'Strongly leaning A';
    if (v < 40) return 'Leaning A';
    if (v > 80) return 'Strongly leaning B';
    if (v > 60) return 'Leaning B';
    return 'Balanced';
  };

  const tradeoffs = [
    {
      id: 1,
      left: {
        title: 'Move fast on a decision so the team isn\'t paralysed',
        desc: 'Even if it means accepting more risk in the call.',
      },
      right: {
        title: 'Pause for one more conversation before deciding',
        desc: 'Even if the team feels stuck in the meantime.',
      },
    },
    {
      id: 2,
      left: {
        title: 'Honour what the community is asking for',
        desc: 'Even when it diverges from the funded programme design.',
      },
      right: {
        title: 'Hold the funded design tightly',
        desc: 'Even when the community is asking for something different.',
      },
    },
    {
      id: 3,
      left: {
        title: 'Give a struggling team member space and time',
        desc: 'Even if a deadline slips because of it.',
      },
      right: {
        title: 'Hold the deadline and the standard',
        desc: 'Even if it feels harder for the person in the moment.',
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#1A1A1A] font-sans flex flex-col relative pb-[80px]">
      <style>{`
        input.custom-range[type=range] {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }
        input.custom-range[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #0047CC;
          box-shadow: 0 4px 10px rgba(0,71,204,0.2);
          cursor: grab;
          margin-top: -7px;
        }
        input.custom-range[type=range]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #0047CC;
          box-shadow: 0 4px 10px rgba(0,71,204,0.2);
          cursor: grab;
        }
      `}</style>

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
        <div className="h-[5px] rounded-[100px] transition-all duration-300 bg-[#387DFF] w-[38px]"></div>
        <div className="h-[5px] rounded-[100px] transition-all duration-300 bg-[#0047CC] w-[64px]"></div>
      </div>

      {/* Main Content */}
      <main className="max-w-[780px] w-full mx-auto px-[20px] sm:px-[28px] pt-[36px] pb-[100px] flex-1">
        <div className="mb-[14px]">
          <Tag
            variant="blue-soft"
            className="uppercase font-[800] tracking-[0.7px] px-[12px] py-[5px]"
            label="The trade-off"
          />
        </div>

        <h1 className="text-[22px] font-[900] text-[#1A1A1A] tracking-[-0.3px] leading-[1.3] mb-[8px]">
          Two things you care about, pulling in opposite directions
        </h1>
        <p className="text-[14px] text-[#808080] leading-[1.6] mb-[24px]">
          For each pair below, slide the marker toward whichever side better reflects how you&apos;d lean even if you wish you didn&apos;t have to choose.
        </p>

        {/* Why this matters */}
        <div className="bg-[#EBF6FF] rounded-[8px] p-[12px_14px] flex gap-[10px] mb-[22px]">
          <svg className="w-[16px] h-[16px] text-[#0047CC] shrink-0 mt-[1px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" strokeLinecap="round" />
          </svg>
          <p className="text-[12.5px] text-[#182348] leading-[1.5]">
            <strong className="font-[800]">Why this matters · </strong>Senior roles are made of trade-offs nobody else gets to make for you. There are no wrong leans here, only honest ones.
          </p>
        </div>

        {/* Scenario */}
        <div className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[18px] p-[24px_26px] mb-[22px]">
          <div className="text-[11px] font-[800] tracking-[0.7px] uppercase text-[#0047CC] mb-[10px]">
            The framing
          </div>
          <p className="text-[15px] text-[#1A1A1A] leading-[1.75] font-[400]">
            Imagine you&apos;re settling into the Reach Africa role four months in. The questions below describe everyday tensions you&apos;d encounter. Slide each one toward the side that feels truer to how you&apos;d actually behave.
          </p>
        </div>

        <p className="text-[16px] font-[800] text-[#1A1A1A] leading-[1.45] mb-[6px]">
          Three trade-offs.
        </p>
        <p className="text-[13px] text-[#808080] leading-[1.55] mb-[20px]">
          You can move the markers as often as you like before continuing.
        </p>

        {/* Tradeoff Pairs */}
        <div className="flex flex-col gap-[14px]">
          {tradeoffs.map((item, idx) => {
            const val = values[idx];
            return (
              <div key={item.id} className="bg-white border-[1.5px] border-[#E6E6E6] rounded-[16px] p-[24px] mb-[14px]">
                <div className="flex justify-between gap-[18px] mb-[18px]">
                  {/* Left Lean A */}
                  <div className="flex-1">
                    <div className="text-[10.5px] font-[800] tracking-[0.8px] uppercase text-[#0047CC] mb-[4px]">
                      Lean A
                    </div>
                    <div className="text-[14px] font-[700] text-[#1A1A1A] leading-[1.45]">
                      {item.left.title}
                    </div>
                    <div className="text-[12.5px] text-[#808080] leading-[1.5] mt-[4px]">
                      {item.left.desc}
                    </div>
                  </div>
                  {/* Right Lean B */}
                  <div className="flex-1 text-right">
                    <div className="text-[10.5px] font-[800] tracking-[0.8px] uppercase text-[#0047CC] mb-[4px]">
                      Lean B
                    </div>
                    <div className="text-[14px] font-[700] text-[#1A1A1A] leading-[1.45]">
                      {item.right.title}
                    </div>
                    <div className="text-[12.5px] text-[#808080] leading-[1.5] mt-[4px]">
                      {item.right.desc}
                    </div>
                  </div>
                </div>

                {/* Range Slider Container */}
                <div className="relative px-[6px] mb-[14px]">
                  <div className="h-[8px] bg-[#EBF6FF] rounded-[100px] relative overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 bg-[#0047CC] rounded-[100px] transition-all duration-150"
                      style={getFillStyle(val)}
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={val}
                    onChange={(e) => handleSliderChange(idx, Number(e.target.value))}
                    className="custom-range"
                  />
                </div>

                {/* Ticks */}
                <div className="flex justify-between text-[11px] font-[700] text-[#ADADAD] mb-[14px]">
                  <span>Strongly A</span>
                  <span>Balanced</span>
                  <span>Strongly B</span>
                </div>

                {/* Readout label */}
                <div className="text-center">
                  <span className="text-[13px] font-[700] text-[#0047CC] bg-[#EBF6FF] rounded-[100px] px-[20px] py-[8px] inline-block">
                    {getLabel(val)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-[10px] border-t border-[#E6E6E6] px-[20px] sm:px-[32px] py-[14px] flex items-center justify-between gap-[12px] z-[50]">
        <div className="text-[13px] text-[#808080] font-[600] hidden sm:block">
          Scenario 5 of 5 · Stage 1
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
            onClick={handleFinish}
            className="rounded-[10px] px-[24px] py-[12px] transition-all font-sans inline-flex items-center justify-center gap-[8px] text-[14px] font-[700] border-none w-full sm:w-auto bg-[#0047CC] text-white shadow-[0_4px_14px_rgba(0,71,204,0.28)] hover:bg-[#344DA1]"
            fullWidth={false}
          >
            Review my answers
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default RoleAssessmentSessionTwoTradeoff;
