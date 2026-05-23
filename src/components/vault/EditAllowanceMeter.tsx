import React from 'react';

interface EditAllowanceMeterProps {
  used: number;
  total: number;
}

const EditAllowanceMeter: React.FC<EditAllowanceMeterProps> = ({ used, total }) => {
  const remaining = total - used;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-bold text-[#808080]">Edit allowance:</span>
      <div className="flex gap-1">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-[22px] h-1.5 rounded-full ${i < used ? 'bg-[#E6E6E6]' : 'bg-[#0047CC]'}`}
          />
        ))}
      </div>
      <span className="text-[11px] text-[#808080]">
        {used} of {total} used — {remaining} remaining
      </span>
    </div>
  );
};

export default EditAllowanceMeter;
