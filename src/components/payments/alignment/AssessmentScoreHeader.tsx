import Tag from '../../common/Tag';
import type { AssessmentTabData } from '../../../types/alignmentReview';

interface AssessmentScoreHeaderProps {
  data: Pick<
    AssessmentTabData,
    'scoreTitle' | 'score' | 'scoreColorClass' | 'statusTag' | 'testInfoTitle' | 'testInfoLines'
  >;
}

const AssessmentScoreHeader: React.FC<AssessmentScoreHeaderProps> = ({ data }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <h4 className="text-[10px] font-bold text-[#ADADAD] uppercase tracking-wider mb-1">
        {data.scoreTitle}
      </h4>
      <div className={`text-3xl font-semibold leading-none ${data.scoreColorClass}`}>
        {data.score}
        <span className="text-sm font-normal text-[#ADADAD]">/100</span>
      </div>
      <Tag label={data.statusTag} variant="green" className="mt-1 text-[10px] py-0.5" />
    </div>
    <div className="text-xs text-[#4A4A4A] leading-relaxed">
      <h4 className="text-[10px] font-bold text-[#ADADAD] uppercase tracking-wider mb-1">
        {data.testInfoTitle}
      </h4>
      {data.testInfoLines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </div>
  </div>
);

export default AssessmentScoreHeader;
