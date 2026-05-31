import AlertBanner from '../../common/AlertBanner';
import Button from '../../common/Button';
import { CloseIcon, VideoIcon } from '../../common/Icons';
import { CardTitle } from '../../common/Typography';

interface AlignmentVideoModalProps {
  open: boolean;
  title: string;
  sessionLabel: string;
  onClose: () => void;
}

const AlignmentVideoModal: React.FC<AlignmentVideoModalProps> = ({
  open,
  title,
  sessionLabel,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/55"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-2xl w-full max-w-[640px] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <CardTitle id="video-modal-title" className="text-base">
            {title}
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
          <div className="bg-slate-950 rounded-xl aspect-video flex flex-col items-center justify-center gap-3 border border-gray-800 text-center p-4">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/25">
              <VideoIcon size={28} className="text-white" />
            </div>
            <p className="text-sm font-semibold text-white/90">
              Video playback available in VORA secure portal
            </p>
            <p className="text-xs text-white/50">{sessionLabel}</p>
          </div>

          <AlertBanner variant="blue" className="!text-xs" showIcon={false}>
            This recording is confidential and accessible only to authorised VORA employer accounts.
            All access is audit-logged. Recording is retained for 24 months per VORA data policy.
          </AlertBanner>

          <div className="flex justify-end pt-2">
            <Button variant="primary" size="sm" fullWidth={false} onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlignmentVideoModal;
