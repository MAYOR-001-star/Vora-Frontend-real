import React from 'react';

interface ConfirmationHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  iconWrapperClassName?: string;
}

const ConfirmationHeader: React.FC<ConfirmationHeaderProps> = ({
  icon,
  title,
  subtitle,
  iconWrapperClassName = 'bg-[#EEFBEE] border-[#85E585]',
}) => (
  <div className="text-center mb-8">
    <div
      className={`w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto mb-5 border-[3px] ${iconWrapperClassName}`}
    >
      {icon}
    </div>
    <h1 className="text-[28px] font-black text-[#1A1A1A] tracking-tight mb-2">{title}</h1>
    <p className="text-[15px] text-[#808080] leading-relaxed max-w-xl mx-auto">{subtitle}</p>
  </div>
);

export default ConfirmationHeader;
