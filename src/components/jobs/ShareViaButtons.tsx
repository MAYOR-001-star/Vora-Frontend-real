import type { ShareChannel } from '../../types/jobs';
import { MailIcon, WhatsappIcon, LinkedinIcon, TwitterIcon } from '../common/Icons';

interface ShareViaButtonsProps {
  channels: ShareChannel[];
  selected: ShareChannel['id'];
  onSelect: (id: ShareChannel['id']) => void;
  className?: string;
}

const channelIcon = (id: ShareChannel['id']) => {
  switch (id) {
    case 'email':
      return (
        <MailIcon size={14} />
      );
    case 'whatsapp':
      return (
        <WhatsappIcon size={14} />
      );
    case 'linkedin':
      return (
        <LinkedinIcon size={14} />
      );
    case 'twitter':
      return (
        <TwitterIcon size={14} />
      );
    default:
      return null;
  }
};

const ShareViaButtons: React.FC<ShareViaButtonsProps> = ({
  channels,
  selected,
  onSelect,
  className = '',
}) => (
  <div className={className}>
    <p className="text-[10px] font-bold text-[#808080] uppercase tracking-wide mb-2.5">
      Share via
    </p>
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Share via">
      {channels.map((channel) => {
        const isSelected = selected === channel.id;
        return (
          <button
            key={channel.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelect(channel.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer ${
              isSelected
                ? 'border-2 border-[#0047CC] bg-white text-[#0047CC]'
                : 'border border-[#E6E6E6] text-[#4A4A4A] hover:border-[#387DFF] hover:text-[#0047CC] hover:bg-white'
            }`}
          >
            {channelIcon(channel.id)}
            {channel.label}
          </button>
        );
      })}
    </div>
  </div>
);

export default ShareViaButtons;
