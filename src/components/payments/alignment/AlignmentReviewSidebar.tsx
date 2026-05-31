import AlignmentFeesSummaryCard from './AlignmentFeesSummaryCard';
import RefundPolicyCard from './RefundPolicyCard';
import ValidRejectionReasonsCard from './ValidRejectionReasonsCard';

interface AlignmentReviewSidebarProps {
  feeLines: { name: string; amount: number }[];
  totalHeld: number;
}

const AlignmentReviewSidebar: React.FC<AlignmentReviewSidebarProps> = ({ feeLines, totalHeld }) => (
  <div className="space-y-4 lg:sticky lg:top-5">
    <AlignmentFeesSummaryCard lines={feeLines} totalHeld={totalHeld} />
    <RefundPolicyCard />
    <ValidRejectionReasonsCard />
  </div>
);

export default AlignmentReviewSidebar;
