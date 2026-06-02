import React from 'react';
import { CardTitle } from './Typography';
import { EditIcon } from './Icons';

interface PreviewSectionCardProps {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
  className?: string;
}

const PreviewSectionCard: React.FC<PreviewSectionCardProps> = ({
  title,
  onEdit,
  children,
  className = '',
}) => (
  <div className={`bg-white border border-[#E6E6E6] rounded-xl overflow-hidden mb-4 ${className}`}>
    <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E6E6E6]">
      <CardTitle>{title}</CardTitle>
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#E6E6E6] px-3 py-1.5 text-[12px] font-semibold text-[#4A4A4A] hover:border-[#ADADAD] transition-colors cursor-pointer"
      >
        <EditIcon size={12} strokeWidth={2.5} />
        Edit
      </button>
    </div>
    <div className="px-5 py-4">{children}</div>
  </div>
);

export default PreviewSectionCard;
