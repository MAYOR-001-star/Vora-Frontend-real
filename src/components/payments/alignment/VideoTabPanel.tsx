import type { VideoTabData } from '../../../types/alignmentReview';
import AssessmentScoreHeader from './AssessmentScoreHeader';
import ScoreBarItem from './ScoreBarItem';
import VideoInterviewMock from './VideoInterviewMock';
import { INTERPRETATION_BOX } from './scoreBarStyles';

interface VideoTabPanelProps {
  data: VideoTabData;
  onPlayVideo: () => void;
}

const VideoTabPanel: React.FC<VideoTabPanelProps> = ({ data, onPlayVideo }) => (
  <div className="space-y-4">
    <AssessmentScoreHeader data={data} />
    <VideoInterviewMock
      caption={data.videoCaption}
      scoreLabel={data.videoScoreLabel}
      onClick={onPlayVideo}
    />
    <div className="space-y-3">
      <h4 className="text-[10px] font-bold text-[#ADADAD] uppercase tracking-wider">
        {data.breakdownTitle ?? 'Question-by-Question Scores'}
      </h4>
      {data.domains.map((domain) => (
        <ScoreBarItem key={domain.label} domain={domain} />
      ))}
    </div>
    {data.communicationStats && data.communicationStats.length > 0 && (
      <>
        <h4 className="text-[10px] font-bold text-[#ADADAD] uppercase tracking-wider">
          AI Communication Analysis
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {data.communicationStats.map((stat) => (
            <div key={stat.label} className="bg-[#F7F7F7] rounded-lg p-2.5">
              <div className="text-[10px] text-[#808080] mb-0.5">{stat.label}</div>
              <div className={`font-bold ${stat.valueColorClass}`}>{stat.value}</div>
            </div>
          ))}
        </div>
      </>
    )}
    {data.interpretation && (
      <div
        className={`p-3 border rounded-xl text-xs leading-relaxed ${INTERPRETATION_BOX[data.interpretation.variant]}`}
      >
        <strong>{data.interpretation.title}</strong> {data.interpretation.body}
      </div>
    )}
  </div>
);

export default VideoTabPanel;
