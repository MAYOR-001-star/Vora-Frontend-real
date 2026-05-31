import type { ScoreDomain } from '../../../types/alignmentReview';
import { SCORE_BAR_FILL } from './scoreBarStyles';

interface ScoreBarItemProps {
  domain: ScoreDomain;
}

const ScoreBarItem: React.FC<ScoreBarItemProps> = ({ domain }) => (
  <div className="text-xs">
    <div className="flex justify-between font-bold mb-1">
      <span className="text-[#4A4A4A]">{domain.label}</span>
      <span className="text-[#1A1A1A]">{domain.value}/100</span>
    </div>
    <div className="h-2 bg-[#F7F7F7] rounded-full overflow-hidden mb-1">
      <div
        className={`h-full rounded-full ${SCORE_BAR_FILL[domain.barColor]}`}
        style={{ width: `${domain.value}%` }}
      />
    </div>
    <p className="text-[11px] text-[#808080] leading-normal">{domain.description}</p>
  </div>
);

export default ScoreBarItem;
