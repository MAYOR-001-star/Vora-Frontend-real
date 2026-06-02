import type { ShareChannel } from '../../types/jobs';
import { MailIcon, WhatsappIcon, LinkedinIcon, TwitterIcon } from '../common/Icons';

interface ShareViaButtonsProps {
  channels: ShareChannel[];
  selected: ShareChannel['id'] | null;
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
    <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Share options">
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
                ? 'border-2 border-[#808080] bg-white text-[#1A1A1A]'
                : 'border border-[#E6E6E6] text-[#4A4A4A] hover:border-[#808080] hover:text-[#1A1A1A] hover:bg-[#F7F7F7]'
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
