import React from 'react';

interface SelectableCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected?: boolean;
  onClick: () => void;
  className?: string;
}

/** Clickable option card for single-choice grids (e.g. compensation type). */
const SelectableCard: React.FC<SelectableCardProps> = ({
  title,
  description,
  icon,
  selected = false,
  onClick,
  className = '',
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full text-left p-4.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-start ${
      selected
        ? 'border-[#0047CC] bg-[#EBF6FF]'
        : 'border-[#E6E6E6] bg-white hover:border-[#ADADAD]'
    } ${className}`}
  >
    <div
      className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 transition-colors ${
        selected ? 'bg-white text-[#0047CC] shadow-xs' : 'bg-[#F7F7F7] text-[#4A4A4A]'
      }`}
    >
      {icon}
    </div>
    <span
      className={`text-[13px] font-medium ${selected ? 'text-[#0047CC]' : 'text-[#1A1A1A]'}`}
    >
      {title}
    </span>
    <span className="text-[11px] text-[#808080] mt-1 leading-relaxed">{description}</span>
  </button>
);

export default SelectableCard;
