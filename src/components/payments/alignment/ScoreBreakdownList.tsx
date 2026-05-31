import type { AssessmentTabData } from '../../../types/alignmentReview';
import AssessmentScoreHeader from './AssessmentScoreHeader';
import ScoreBarItem from './ScoreBarItem';
import { INTERPRETATION_BOX } from './scoreBarStyles';

interface ScoreBreakdownListProps {
  data: AssessmentTabData;
}

const ScoreBreakdownList: React.FC<ScoreBreakdownListProps> = ({ data }) => (
  <div className="space-y-4">
    <AssessmentScoreHeader data={data} />
    <div className="space-y-3">
      <h4 className="text-[10px] font-bold text-[#ADADAD] uppercase tracking-wider">
        {data.breakdownTitle ?? 'Domain Breakdown'}
      </h4>
      {data.domains.map((domain) => (
        <ScoreBarItem key={domain.label} domain={domain} />
      ))}
    </div>
    {data.interpretation && (
      <div
        className={`p-3 border rounded-xl text-xs leading-relaxed ${INTERPRETATION_BOX[data.interpretation.variant]}`}
      >
        <strong>{data.interpretation.title}</strong> {data.interpretation.body}
      </div>
    )}
  </div>
);

export default ScoreBreakdownList;
