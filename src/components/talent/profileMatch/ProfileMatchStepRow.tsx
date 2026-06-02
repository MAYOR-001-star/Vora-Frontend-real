import Spinner from '../../common/Spinner';
import ToastSuccessIcon from '../../common/ToastSuccessIcon';
import type { ProfileMatchStepStatus } from '../../../constants/profileMatchBuilding';

interface ProfileMatchStepRowProps {
  title: string;
  subtitle: string;
  status: ProfileMatchStepStatus;
  isLast?: boolean;
}

const statusBadge: Record<ProfileMatchStepStatus, { label: string; className: string }> = {
  done: { label: 'Done', className: 'bg-[#EBF6FF] text-[#0047CC]' },
  running: { label: 'Running…', className: 'bg-[#EBF6FF] text-[#60A5FA]' },
  queued: { label: 'Queued', className: 'bg-[#F7F7F7] text-[#ADADAD]' },
};

const ProfileMatchStepRow: React.FC<ProfileMatchStepRowProps> = ({
  title,
  subtitle,
  status,
  isLast = false,
}) => {
  const badge = statusBadge[status];

  return (
    <div
      className={`flex items-center gap-3.5 py-2.5 ${isLast ? '' : 'border-b border-[#F7F7F7]'}`}
    >
      <div
        className={`w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0 border-2 ${
          status === 'done'
            ? 'bg-white border-[#387DFF]'
            : status === 'running'
              ? 'bg-white border-[#387DFF]'
              : 'bg-[#F7F7F7] border-[#E6E6E6]'
        }`}
      >
        {status === 'done' ? (
          <ToastSuccessIcon size="sm" />
        ) : status === 'running' ? (
          <Spinner size={16} className="text-[#60A5FA]" />
        ) : (
          <span className="w-2 h-2 rounded-full bg-[#ADADAD]" aria-hidden />
        )}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-sm font-semibold text-[#1A1A1A] mb-0.5">{title}</p>
        <p className="text-xs text-[#808080] leading-relaxed">{subtitle}</p>
      </div>
      <span
        className={`text-xs font-semibold px-3 py-0.5 rounded-full shrink-0 ${badge.className}`}
      >
        {badge.label}
      </span>
    </div>
  );
};

export default ProfileMatchStepRow;
