import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VoraLogo from '../../components/common/VoraLogo';
import Button from '../../components/common/Button';
import Tag from '../../components/common/Tag';

const DocumentCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const BrainIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 0-4 4c0 1 .3 1.8.8 2.5C7.2 9.4 6 11.1 6 13a6 6 0 0 0 6 6"/>
    <path d="M12 2a4 4 0 0 1 4 4c0 1-.3 1.8-.8 2.5C16.8 9.4 18 11.1 18 13a6 6 0 0 1-6 6"/>
    <path d="M12 19v3"/>
  </svg>
);

interface Statement {
  t: string;
  s: string;
}

const BLOCKS: Statement[][] = [
  [
    { t: "CO", s: "I like to finish what I start, even when it stops being interesting" },
    { t: "HH", s: "I would rather lose credit than take it for work that was not mine" },
    { t: "EM", s: "I notice quickly when someone in the room is struggling" },
    { t: "OP", s: "I enjoy rethinking how something is done when there is a better way" }
  ],
  [
    { t: "ES", s: "I stay steady when things around me get tense" },
    { t: "CO", s: "I plan ahead so a deadline rarely surprises me" },
    { t: "HH", s: "I own a mistake straight away rather than manage how it looks" },
    { t: "EM", s: "I adjust how I explain things to whoever I am talking to" }
  ],
  [
    { t: "OP", s: "I am curious about fields that are not my own" },
    { t: "ES", s: "I can sit with not knowing the answer yet without getting rattled" },
    { t: "CO", s: "I keep my commitments even when no one is checking" },
    { t: "HH", s: "I am comfortable being the least experienced person in the room" }
  ],
  [
    { t: "EM", s: "I check that a decision works for the people it affects, not just on paper" },
    { t: "OP", s: "I look for the assumption everyone has stopped questioning" },
    { t: "ES", s: "Criticism stings less than it used to, I take what is useful and move on" },
    { t: "CO", s: "I would rather do a smaller thing properly than a bigger thing roughly" }
  ],
  [
    { t: "HH", s: "I would flag my own error even if no one would have found it" },
    { t: "EM", s: "I can tell when a quiet person disagrees and make room for them" },
    { t: "OP", s: "I change my mind when the evidence changes, without it feeling like a loss" },
    { t: "ES", s: "Under pressure I get calmer and more deliberate, not faster and looser" }
  ],
  [
    { t: "CO", s: "I would rather under promise and over deliver than the reverse" },
    { t: "OP", s: "I enjoy a problem more when I have never seen one like it" },
    { t: "HH", s: "I do not need the room to know how much I contributed" },
    { t: "EM", s: "I would rather be told a hard truth kindly than be spared it" }
  ],
  [
    { t: "ES", s: "A setback is information to me, not a verdict on me" },
    { t: "EM", s: "I read a room before I decide how to say something" },
    { t: "CO", s: "I tidy the loose ends others leave so they do not become someone's problem" },
    { t: "HH", s: "I would rather be corrected and right than uncorrected and wrong" }
  ]
];

const TNAME: Record<string, string> = {
  CO: "Conscientiousness",
  HH: "Honesty and humility",
  ES: "Emotional steadiness",
  EM: "Empathy",
  OP: "Openness"
};

const RoleAssessmentSessionForcedChoice: React.FC = () => {
  const navigate = useNavigate();
  const { roleSlug } = useParams<{ roleSlug: string }>();

  const [idx, setIdx] = useState(0);
  const [picks, setPicks] = useState<Record<number, { most?: number; least?: number }>>({});
  const [scores, setScores] = useState<Record<string, number>>({ CO: 0, HH: 0, ES: 0, EM: 0, OP: 0 });
  const [finished, setFinished] = useState(false);

  const handleSelect = (stmtIndex: number, choice: 'most' | 'least') => {
    const cur = { ...picks[idx] };
    if (choice === 'most') {
      if (cur.most === stmtIndex) {
        delete cur.most;
      } else {
        if (cur.least === stmtIndex) {
          delete cur.least;
        }
        cur.most = stmtIndex;
      }
    } else {
      if (cur.least === stmtIndex) {
        delete cur.least;
      } else {
        if (cur.most === stmtIndex) {
          delete cur.most;
        }
        cur.least = stmtIndex;
      }
    }
    setPicks(prev => ({ ...prev, [idx]: cur }));
  };

  const currentPick = picks[idx] || {};
  const isBlockComplete = currentPick.most !== undefined && currentPick.least !== undefined && currentPick.most !== currentPick.least;

  const handleContinue = () => {
    // Score the current block
    const updatedScores = { ...scores };
    const mostTrait = BLOCKS[idx][currentPick.most!].t;
    const leastTrait = BLOCKS[idx][currentPick.least!].t;

    updatedScores[mostTrait] += 2;
    updatedScores[leastTrait] -= 1;
    setScores(updatedScores);

    if (idx < BLOCKS.length - 1) {
      setIdx(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      setFinished(true);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    navigate(`/onboarding/talent/${roleSlug}/assessment/session-1/psychometric-values`);
  };

  const progressPct = (idx / BLOCKS.length) * 100;

  if (finished) {
    const lo = -7;
    const hi = 14;
    const traits = ['CO', 'HH', 'ES', 'EM', 'OP'];

    return (
      <div className="min-h-screen bg-[#F7F7F7] text-[#1A1A1A] font-sans flex flex-col relative pb-[80px]">
        <header className="bg-white/95 backdrop-blur-[10px] border-b border-[#E6E6E6] px-[20px] sm:px-[32px] py-[14px] flex items-center justify-between sticky top-0 z-[50]">
          <span className="inline-flex items-center gap-[1px] text-[#0047CC]">
            <VoraLogo size="sm" to="/dashboard" />
          </span>
          <div className="text-[12.5px] text-[#808080] font-[600] text-center hidden sm:block">
            Stage 1 · Getting to know you · Forced choice
          </div>
          <div className="flex items-center gap-[6px] text-[12px] text-[#808080] font-[600]">
            <div className="w-[16px] h-[16px] rounded-full border border-[#0047CC] bg-white flex items-center justify-center shrink-0">
              <DocumentCheckIcon className="w-[9px] h-[9px] text-[#0047CC]" />
            </div>
            Auto-saved
          </div>
        </header>

        <main className="max-w-[720px] w-full mx-auto px-[22px] pt-[30px] pb-[120px] flex-1">
          <div className="text-[#0047CC] text-[11px] font-[800] uppercase tracking-[0.7px] mb-[8px]">
            FAKING RESISTANT BY DESIGN
          </div>
          <h1 className="text-[23px] font-[800] text-[#182348] tracking-[-0.4px] leading-[1.25] mb-[8px]">
            Pick what is most and least like you
          </h1>
          <p className="text-[14.5px] text-[#4A4A4A] leading-[1.6] mb-[18px]">
            In each set, every option is something people are happy to say about themselves. There is no obviously right answer to chase. You choose the one that is most like you and the one that is least like you, and the set is scored so that lifting one quality means easing off another. That is what stops the test from simply measuring who can guess the flattering answer.
          </p>

          <div className="h-[4px] bg-[#0047CC] rounded-full mb-[24px]" />

          <p className="text-[14.5px] text-[#4A4A4A] leading-[1.6] mb-[20px]">
            Your profile comes from how you ranked qualities against each other, not from how many you agreed with. Because every option was desirable, agreeing with all of them was never on the table, which is exactly how the format resists a flattering performance.
          </p>

          <div className="bg-white border border-[#E6E6E6] rounded-2xl p-[24px_28px] shadow-[0_10px_30px_-22px_rgba(24,35,72,0.5)]">
            <div className="text-[#0047CC] text-[11px] font-[800] uppercase tracking-[0.8px] mb-[6px]">
              YOUR STAGE 1 DISPOSITION READ
            </div>
            <h2 className="text-[23px] font-[800] text-[#182348] tracking-[-0.4px] leading-[1.25] mb-[18px]">
              A picture built from trade offs
            </h2>

            <div className="space-y-[16px]">
              {traits.map((k) => {
                const rawPct = Math.round(((scores[k] - lo) / (hi - lo)) * 100);
                const pct = Math.max(4, Math.min(100, rawPct));

                return (
                  <div key={k} className="mb-[12px]">
                    <div className="flex justify-between font-[800] text-[13.5px] text-[#182348] mb-[6px]">
                      <span>{TNAME[k]}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-[9px] bg-[#E6E6E6] rounded-full overflow-hidden">
                      <div className="h-full bg-[#0047CC] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[12px] text-[#ADADAD] mt-[14px] leading-[1.5]">
            This is a demonstration of the mechanism. In a live sitting these scores feed the scoring judge with the same reliability floor and validity indices the full battery carries, and a profile that a behavioural pattern later contradicts is flagged rather than trusted.
          </p>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-[10px] border-t border-[#E6E6E6] px-[32px] py-[14px] flex items-center justify-between gap-[12px] z-[50]">
          <div className="text-[13px] text-[#808080] font-[600]">
            Assessment profile generated
          </div>
          <Button
            onClick={handleNextPage}
            fullWidth={false}
            className="rounded-full px-[36px] py-[12px] text-[14px] font-[700] transition-all bg-[#0047CC] text-white shadow-[0_4px_14px_rgba(0,71,204,0.28)] hover:bg-[#344DA1] hover:-translate-y-[1px] whitespace-nowrap !min-h-0 flex items-center justify-center gap-[8px]"
          >
            Continue
          </Button>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#1A1A1A] font-sans flex flex-col relative pb-[80px]">
      {/* Top Bar */}
      <header className="bg-white/95 backdrop-blur-[10px] border-b border-[#E6E6E6] px-[20px] sm:px-[32px] py-[14px] flex items-center justify-between sticky top-0 z-[50]">
        <span className="inline-flex items-center gap-[1px] text-[#0047CC]">
          <VoraLogo size="sm" to="/dashboard" />
        </span>
        <div className="text-[12.5px] text-[#808080] font-[600] text-center hidden sm:block">
          Stage 1 · Getting to know you · Forced choice
        </div>
        <div className="flex items-center gap-[6px] text-[12px] text-[#808080] font-[600]">
          <div className="w-[16px] h-[16px] rounded-full border border-[#0047CC] bg-white flex items-center justify-center shrink-0">
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
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#0047CC] w-[64px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
        <div className="h-[5px] rounded-full transition-all duration-300 bg-[#E6E6E6] w-[38px]"></div>
      </div>

      {/* Main Content */}
      <main className="max-w-[720px] w-full mx-auto px-[22px] pt-[30px] pb-[120px] flex-1">
        <div className="mb-[12px]">
          <Tag
            variant="blue-soft"
            className="uppercase font-[800] tracking-[0.7px] px-[12px] py-[5px]"
            label={
              <span className="flex items-center gap-[7px]">
                <BrainIcon className="w-[12px] h-[12px]" />
                Faking resistant by design
              </span>
            }
          />
        </div>
        <h1 className="text-[23px] font-[800] text-[#182348] tracking-[-0.4px] leading-[1.25] mb-[6px]">
          Pick what is most and least like you
        </h1>
        <p className="text-[14.5px] text-[#4A4A4A] leading-[1.6] mb-[18px]">
          In each set, every option is something people are happy to say about themselves. There is no obviously right answer to chase. You choose the one that is most like you and the one that is least like you, and the set is scored so that lifting one quality means easing off another. That is what stops the test from simply measuring who can guess the flattering answer.
        </p>

        {/* Local Progress Bar */}
        <div className="h-[6px] bg-[#E6E6E6] rounded-full overflow-hidden mb-[22px]">
          <div className="h-full bg-[#0047CC] rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>

        {/* Set Card */}
        <div className="bg-white border border-[#E6E6E6] rounded-2xl p-[20px_20px_12px] shadow-[0_10px_30px_-22px_rgba(24,35,72,0.5)]">
          <div className="font-[800] text-[15px] text-[#182348] mb-[4px]">
            Which is most and least like you?
          </div>
          <div className="text-[13px] text-[#808080] mb-[16px]">
            Set {idx + 1} of {BLOCKS.length}. Choose one most and one least.
          </div>

          <div className="space-y-[10px]">
            {BLOCKS[idx].map((o, i) => {
              const isMost = currentPick.most === i;
              const isLeast = currentPick.least === i;

              return (
                <div key={i} className="flex items-center gap-[12px] border-[1.5px] border-[#E6E6E6] rounded-l-[12px] rounded-r-[12px] p-[12px_14px]">
                  <div className="flex-1 text-[14.5px] font-[500] text-[#1A1A1A] leading-[1.45] text-left">
                    {o.s}
                  </div>
                  <div className="flex gap-[8px] shrink-0">
                    <button
                      type="button"
                      onClick={() => handleSelect(i, 'most')}
                      className={`border-[1.5px] border-[#E6E6E6] rounded-[9px] px-[11px] py-[7px] text-[12.5px] font-[800] cursor-pointer transition-all ${
                        isMost
                          ? 'bg-[#EBF6FF] border-[#0047CC] text-[#0047CC] shadow-[0_0_0_3px_rgba(0,71,204,0.1)]'
                          : 'bg-white text-[#808080] hover:border-[#0047CC] hover:text-[#0047CC]'
                      }`}
                    >
                      Most
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelect(i, 'least')}
                      className={`border-[1.5px] border-[#E6E6E6] rounded-[9px] px-[11px] py-[7px] text-[12.5px] font-[800] cursor-pointer transition-all ${
                        isLeast
                          ? 'bg-[#FEF2F2] border-[#DC2626] text-[#DC2626] shadow-[0_0_0_3px_rgba(220,38,38,0.1)]'
                          : 'bg-white text-[#808080] hover:border-[#DC2626] hover:text-[#DC2626]'
                      }`}
                    >
                      Least
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-[10px] border-t border-[#E6E6E6] px-[28px] py-[14px] flex justify-between items-center z-[50]">
        <div className="text-[13px] text-[#808080] font-[600]">
          Set {idx + 1} of {BLOCKS.length}
        </div>
        <Button
          onClick={handleContinue}
          disabled={!isBlockComplete}
          fullWidth={false}
          className={`rounded-full px-[24px] py-[12px] text-[14px] font-[700] transition-all whitespace-nowrap !min-h-0 flex items-center justify-center gap-[8px]
            ${isBlockComplete
              ? 'bg-[#0047CC] text-white shadow-[0_4px_14px_rgba(0,71,204,0.28)] hover:bg-[#344DA1]'
              : 'bg-[#E6E6E6] text-[#ADADAD] cursor-not-allowed'
            }`}
        >
          {idx === BLOCKS.length - 1 ? 'See my profile' : 'Continue'}
        </Button>
      </footer>
    </div>
  );
};

export default RoleAssessmentSessionForcedChoice;
