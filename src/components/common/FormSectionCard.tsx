import React from 'react';

interface FormSectionCardProps {
  title: string;
  changed?: boolean;
  changedLabel?: string;
  children: React.ReactNode;
  className?: string;
}

const FormSectionCard: React.FC<FormSectionCardProps> = ({
  title,
  changed = false,
  changedLabel = 'Changed',
  children,
  className = '',
}) => (
  <div className={`bg-white border border-[#E6E6E6] rounded-xl px-7 py-6 mb-4 ${className}`}>
    <div className="flex items-center gap-2 mb-4">
      <h2 className="text-base font-extrabold text-[#1A1A1A]">{title}</h2>
      {changed && (
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]">
          {changedLabel}
        </span>
      )}
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

export default FormSectionCard;
