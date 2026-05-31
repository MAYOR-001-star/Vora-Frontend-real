import Button from '../../common/Button';
import { CheckIcon, CloseIcon } from '../../common/Icons';

interface AlignmentCandidateFooterProps {
  onReject: () => void;
  onHire: () => void;
}

const AlignmentCandidateFooter: React.FC<AlignmentCandidateFooterProps> = ({ onReject, onHire }) => (
  <div className="p-4 bg-[#F7F7F7] border-t border-[#E6E6E6] flex justify-end gap-3 flex-wrap sm:flex-nowrap">
    <Button
      variant="outline"
      size="sm"
      fullWidth={false}
      onClick={onReject}
      className="font-bold shrink-0 text-xs px-4"
    >
      <CloseIcon size={12} className="mr-1" />
      Reject with Reason
    </Button>
    <Button
      variant="primary"
      size="sm"
      fullWidth={false}
      onClick={onHire}
      className="font-bold shrink-0 text-xs px-4"
    >
      <CheckIcon size={12} className="mr-1" strokeWidth={3} />
      Hire – Trigger Full Refund
    </Button>
  </div>
);

export default AlignmentCandidateFooter;
