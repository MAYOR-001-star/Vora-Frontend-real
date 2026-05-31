import Tag from '../../common/Tag';
import { CheckIcon } from '../../common/Icons';
import type { OverallTabData } from '../../../types/alignmentReview';

interface OverallDecisionPanelProps {
  data: OverallTabData;
}

const OverallDecisionPanel: React.FC<OverallDecisionPanelProps> = ({ data }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-3 gap-2.5 text-center">
      {data.scoreCards.map((card) => (
        <div
          key={card.label}
          className={`border rounded-xl p-3 flex flex-col items-center ${card.cardClassName}`}
        >
          <h5 className="text-[10px] font-bold text-[#808080] uppercase mb-1">{card.label}</h5>
          <div className={`text-xl font-semibold mb-1 ${card.scoreColorClass}`}>{card.score}</div>
          <Tag label={card.tagLabel} variant={card.tagVariant} className="text-[9px] py-0 px-2" />
        </div>
      ))}
    </div>

    <div className="bg-[#F7F7F7] border border-[#E6E6E6] rounded-xl p-4">
      <h5 className="text-[10px] font-bold text-[#808080] uppercase tracking-wider mb-1">
        Composite Score
      </h5>
      <div className="text-2xl font-semibold text-[#1A1A1A]">
        {data.compositeScore}{' '}
        <span className="text-xs font-normal text-[#ADADAD]">/ 100 composite</span>
      </div>
      <p className="text-[10px] text-[#808080] mt-0.5">{data.weightingNote}</p>
    </div>

    {data.passSummary && (
      <div className="text-xs space-y-2">
        <p className="font-bold text-[#1A1A1A]">{data.passSummary.title}</p>
        <div className="text-[#808080] leading-relaxed space-y-1">
          {data.passSummary.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>
    )}

    <div className="p-3 bg-[#EEFBEE] border border-[#2CA62C]/20 rounded-xl text-xs text-[#135813] leading-relaxed flex gap-2">
      <CheckIcon size={14} className="text-[#2CA62C] shrink-0 mt-0.5" strokeWidth={3} />
      <div>
        <strong>VORA recommendation:</strong> {data.recommendation.body}
      </div>
    </div>
  </div>
);

export default OverallDecisionPanel;
