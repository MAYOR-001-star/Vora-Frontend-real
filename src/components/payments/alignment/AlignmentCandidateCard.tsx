import { useState } from 'react';
import Tag from '../../common/Tag';
import type { AlignmentCandidateData } from '../../../types/alignmentReview';
import type { DecisionStatus, PaymentsTabType } from '../../../types/employer';
import AlignmentReviewTabs from './AlignmentReviewTabs';
import AlignmentSessionRows from './AlignmentSessionRows';
import ScoreBreakdownList from './ScoreBreakdownList';
import VideoTabPanel from './VideoTabPanel';
import OverallDecisionPanel from './OverallDecisionPanel';
import AlignmentCandidateFooter from './AlignmentCandidateFooter';

interface AlignmentCandidateCardProps {
  candidate: AlignmentCandidateData;
  status: DecisionStatus;
  onReject: () => void;
  onHire: () => void;
  onPlayVideo: () => void;
}

const STATUS_TAGS: Record<
  DecisionStatus,
  { label: string; variant: 'yellow' | 'green' | 'red' } | null
> = {
  pending: { label: 'Awaiting Decision', variant: 'yellow' },
  hired: { label: 'Hired (Refunded)', variant: 'green' },
  rejected: { label: 'Rejected (In Review)', variant: 'red' },
};

const AlignmentCandidateCard: React.FC<AlignmentCandidateCardProps> = ({
  candidate,
  status,
  onReject,
  onHire,
  onPlayVideo,
}) => {
  const [activeTab, setActiveTab] = useState<PaymentsTabType>('session');
  const statusTag = STATUS_TAGS[status];

  return (
    <div className="bg-white border border-[#E6E6E6] rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-4 p-5 border-b border-[#F7F7F7] flex-wrap sm:flex-nowrap">
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${candidate.avatarClassName}`}
        >
          {candidate.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <h2 className="text-base font-bold text-[#1A1A1A]">{candidate.name}</h2>
            <Tag
              label={candidate.roleTitle}
              variant={candidate.roleTagVariant}
              className="text-[10px] py-0.5 font-bold"
            />
          </div>
          <p className="text-xs text-[#808080]">{candidate.subtitle}</p>
        </div>
        {statusTag && (
          <Tag label={statusTag.label} variant={statusTag.variant} className="text-xs py-1 font-bold" />
        )}
      </div>

      <div className="p-5">
        <AlignmentReviewTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'session' && <AlignmentSessionRows rows={candidate.session} />}
        {activeTab === 'psychometric' && <ScoreBreakdownList data={candidate.psychometric} />}
        {activeTab === 'sjt' && <ScoreBreakdownList data={candidate.sjt} />}
        {activeTab === 'video' && (
          <VideoTabPanel data={candidate.video} onPlayVideo={onPlayVideo} />
        )}
        {activeTab === 'overall' && <OverallDecisionPanel data={candidate.overall} />}
      </div>

      {status === 'pending' && (
        <AlignmentCandidateFooter onReject={onReject} onHire={onHire} />
      )}
    </div>
  );
};

export default AlignmentCandidateCard;
