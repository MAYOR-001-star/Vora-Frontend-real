import AlertBanner from '../../common/AlertBanner';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { CloseIcon } from '../../common/Icons';
import { CardTitle } from '../../common/Typography';

interface HireAlignmentModalProps {
  open: boolean;
  candidateName: string;
  reference: string;
  alignmentFee: number;
  salary: string;
  onSalaryChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

const HireAlignmentModal: React.FC<HireAlignmentModalProps> = ({
  open,
  candidateName,
  reference,
  alignmentFee,
  salary,
  onSalaryChange,
  onClose,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/55"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-2xl w-full max-w-[480px] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="hire-modal-title"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <CardTitle id="hire-modal-title" className="text-base">
            Confirm Hire
          </CardTitle>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full border border-[#E6E6E6] bg-[#F7F7F7] flex items-center justify-center text-[#808080] hover:bg-[#E6E6E6] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <CloseIcon size={14} />
          </button>
        </div>

        <div className="space-y-4">
          <AlertBanner variant="green" className="!text-xs">
            Hiring will <strong>auto-refund the full alignment fee</strong> to your wallet immediately
            and release the offer letter.
          </AlertBanner>

          <div className="text-xs space-y-1 text-[#808080] bg-[#F7F7F7] p-3 rounded-lg border border-[#E6E6E6]">
            <div>
              <strong>Candidate:</strong> {candidateName}
            </div>
            <div>
              <strong>Reference:</strong> #{reference}
            </div>
            <div>
              <strong>Alignment fee:</strong> ${alignmentFee.toFixed(2)} → refunded on confirmation
            </div>
          </div>

          <div className="space-y-1.5">
            <Input
              label="Declare final accepted salary (required for escrow true-up)"
              type="number"
              placeholder="Enter final accepted salary (e.g. 68000)"
              value={salary}
              onChange={(e) => onSalaryChange(e.target.value)}
            />
            <p className="text-[10px] text-[#808080]">
              Must be within the declared range. True-up or credit will fire automatically within 24
              hours.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" fullWidth={false} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" fullWidth={false} onClick={onConfirm}>
              Confirm Hire &amp; Refund
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireAlignmentModal;
