import Tag from '../../common/Tag';
import { AlertTriangleIcon, CheckIcon, ChevronDownIcon } from '../../common/Icons';
import type { HistoricalAlignmentSession } from '../../../types/alignmentReview';

interface HistoricalAlignmentCardProps {
  session: HistoricalAlignmentSession;
  expanded: boolean;
  onToggle: () => void;
}

const HistoricalAlignmentCard: React.FC<HistoricalAlignmentCardProps> = ({
  session,
  expanded,
  onToggle,
}) => (
  <div
    className={`bg-white border rounded-xl overflow-hidden mb-3 ${session.borderClassName ?? 'border-[#E6E6E6]'}`}
  >
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center gap-3 p-3.5 cursor-pointer hover:bg-[#F7F7F7] transition-colors flex-wrap sm:flex-nowrap text-left"
    >
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${session.avatarClassName}`}
      >
        {session.initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <span className="text-xs font-bold text-[#1A1A1A]">{session.name}</span>
          <Tag
            label={session.roleTitle}
            variant={session.roleTagVariant}
            className="text-[9px] py-0.5 font-bold"
          />
        </div>
        <p className={`text-[10px] ${session.summaryLineClassName ?? 'text-[#808080]'}`}>
          {session.summaryLine}
        </p>
      </div>
      <Tag
        label={session.statusTag.label}
        variant={session.statusTag.variant}
        className="text-[10px] py-0.5 font-bold shrink-0"
      />
      <ChevronDownIcon
        size={14}
        className={`text-[#ADADAD] transition-transform shrink-0 ${expanded ? 'rotate-180' : ''}`}
      />
    </button>

    {expanded && (
      <div className="p-4 border-t border-[#F7F7F7] bg-[#F7F7F7]/50 space-y-3 text-xs animate-slideDown">
        {session.determination && (
          <div
            className={`flex gap-2.5 rounded-lg p-3 leading-normal border ${
              session.determination.variant === 'red'
                ? 'bg-[#FEF2F2] border-[#FECACA] text-[#DC2626]'
                : 'bg-[#EEFBEE] border-[#2CA62C]/20 text-[#135813]'
            }`}
          >
            {session.determination.variant === 'red' ? (
              <AlertTriangleIcon size={14} className="shrink-0 mt-0.5" />
            ) : (
              <CheckIcon size={14} className="shrink-0 mt-0.5" strokeWidth={3} />
            )}
            <div>
              <strong>VORA determination:</strong> {session.determination.body}
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2.5 text-center">
          {session.scores.map((cell) => (
            <div
              key={cell.label}
              className="bg-white border border-[#E6E6E6] rounded-lg p-2 flex flex-col items-center"
            >
              <div className="text-[9px] font-bold text-[#808080] uppercase mb-1">{cell.label}</div>
              <div className={`text-lg font-bold mb-1 ${cell.scoreColorClass ?? 'text-[#1A1A1A]'}`}>
                {cell.score}
              </div>
              {cell.statusTag && (
                <Tag
                  label={cell.statusTag.label}
                  variant={cell.statusTag.variant}
                  className="text-[9px] py-0 px-2"
                />
              )}
            </div>
          ))}
        </div>

        {session.paragraphs.map((paragraph) => (
          <p key={paragraph.label} className="text-[#808080] leading-relaxed">
            <strong className="text-[#4A4A4A]">{paragraph.label}</strong> {paragraph.text}
          </p>
        ))}
      </div>
    )}
  </div>
);

export default HistoricalAlignmentCard;
