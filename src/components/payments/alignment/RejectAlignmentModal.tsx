import AlertBanner from '../../common/AlertBanner';
import Button from '../../common/Button';
import Textarea from '../../common/Textarea';
import { CloseIcon } from '../../common/Icons';
import { CardTitle } from '../../common/Typography';
import { REJECTION_REASON_OPTIONS } from '../../../constants/alignmentReview';

interface RejectAlignmentModalProps {
  open: boolean;
  candidateName: string;
  alignmentFee: number;
  reason: string;
  notes: string;
  onReasonChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

const RejectAlignmentModal: React.FC<RejectAlignmentModalProps> = ({
  open,
  candidateName,
  alignmentFee,
  reason,
  notes,
  onReasonChange,
  onNotesChange,
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
        className="bg-white rounded-2xl w-full max-w-[500px] p-6 shadow-xl max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reject-modal-title"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <CardTitle id="reject-modal-title" className="text-base">
            Reject with Reason
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
          <AlertBanner variant="amber" className="!text-xs">
            A valid documented reason is required for refund. VORA reviews within 2 business days.{' '}
            <strong>${alignmentFee.toFixed(2)}</strong> is forfeited if reason is invalid or
            undocumented.
          </AlertBanner>

          <p className="text-xs font-semibold text-[#4A4A4A]">
            Rejection reason for <span className="text-[#0047CC] font-bold">{candidateName}</span>:
          </p>

          <div className="space-y-2">
            {REJECTION_REASON_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex items-start gap-3 p-3 border border-[#E6E6E6] rounded-xl cursor-pointer hover:border-[#387DFF] hover:bg-white transition-all"
              >
                <input
                  type="radio"
                  name="alignment-reject-reason"
                  value={opt.value}
                  checked={reason === opt.value}
                  onChange={() => onReasonChange(opt.value)}
                  className="mt-0.5 accent-[#0047CC]"
                />
                <div>
                  <div className="text-xs font-bold text-[#1A1A1A]">{opt.title}</div>
                  <div className="text-[10px] text-[#808080]">{opt.description}</div>
                </div>
              </label>
            ))}
          </div>

          <Textarea
            label='Supporting notes (required for "Other" · recommended for all)'
            placeholder="Provide specific, factual details…"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            className="min-h-[75px] text-xs font-semibold"
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" fullWidth={false} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              fullWidth={false}
              onClick={onConfirm}
              className="!bg-[#DC2626] hover:!bg-[#B91C1C]"
            >
              Submit Rejection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectAlignmentModal;
