import { useMemo, useState } from 'react';
import type { ShareChannel } from '../../types/jobs';
import { buildShareHref } from '../../utils/shareLinks';
import CopyLinkField from './CopyLinkField';
import ShareViaButtons from './ShareViaButtons';

interface RoleShareSectionProps {
  channels: ShareChannel[];
  shareUrl: string;
  shareTitle: string;
  className?: string;
}

const RoleShareSection: React.FC<RoleShareSectionProps> = ({
  channels,
  shareUrl,
  shareTitle,
  className = '',
}) => {
  const [selected, setSelected] = useState<ShareChannel['id']>('email');

  const displayLink = useMemo(
    () => buildShareHref(selected, shareUrl, shareTitle),
    [selected, shareUrl, shareTitle],
  );

  return (
    <div className={className}>
      <CopyLinkField url={displayLink} className="mb-4" />
      <ShareViaButtons
        channels={channels}
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  );
};

export default RoleShareSection;
