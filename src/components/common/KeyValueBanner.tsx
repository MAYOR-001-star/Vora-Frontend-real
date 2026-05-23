import React from 'react';

export interface KeyValueBannerItem {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}

interface KeyValueBannerProps {
  items: KeyValueBannerItem[];
  className?: string;
}

const KeyValueBanner: React.FC<KeyValueBannerProps> = ({ items, className = '' }) => (
  <div
    className={`bg-[#EBF6FF] border-[1.5px] border-[#BDD9FF] rounded-xl px-5 py-4 mb-6 flex items-center justify-between flex-wrap gap-3 ${className}`}
  >
    {items.map((item) => (
      <div key={item.label}>
        <div className="text-[12px] font-bold text-[#808080] uppercase tracking-wide">{item.label}</div>
        <div className={`text-[15px] font-bold text-[#1A1A1A] mt-0.5 ${item.valueClassName ?? ''}`}>
          {item.value}
        </div>
      </div>
    ))}
  </div>
);

export default KeyValueBanner;
