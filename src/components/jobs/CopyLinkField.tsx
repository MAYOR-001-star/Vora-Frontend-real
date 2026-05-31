import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CheckIcon } from '../common/Icons';

interface CopyLinkFieldProps {
  url: string;
  className?: string;
}

const CopyLinkField: React.FC<CopyLinkFieldProps> = ({ url, className = '' }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [url]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error('Could not copy link. Please copy manually.');
    }
  }, [url]);

  return (
    <div className={`flex flex-col sm:flex-row gap-2 ${className}`}>
      <input
        readOnly
        value={url}
        className="flex-1 min-w-0 px-3.5 py-2.5 border border-[#E6E6E6] rounded-lg text-[13px] text-[#4A4A4A] bg-[#F7F7F7] outline-none"
        aria-label="Role share link"
      />
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex items-center justify-center gap-1.5 shrink-0 px-5 py-2.5 rounded-lg text-[13px] font-bold transition-colors cursor-pointer ${
          copied
            ? 'bg-[#0047CC] text-white'
            : 'bg-[#0047CC] hover:bg-[#0039A6] text-white'
        }`}
      >
        {copied ? (
          <>
            <CheckIcon size={12} strokeWidth={3} />
            Copied!
          </>
        ) : (
          'Copy link'
        )}
      </button>
    </div>
  );
};

export default CopyLinkField;
