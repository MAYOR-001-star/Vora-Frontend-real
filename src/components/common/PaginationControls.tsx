import React from 'react';
import Button from './Button';

interface PaginationControlsProps {
  currentPage: number; // 0-indexed or 1-indexed (depending on usage, usually we'll use disable rules)
  disablePrev: boolean;
  disableNext: boolean;
  onPageChange: (delta: number) => void;
  className?: string;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  disablePrev,
  disableNext,
  onPageChange,
  className = '',
}) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        variant="outline"
        fullWidth={false}
        size="sm"
        pill={false}
        className="!min-h-0 !px-3.5 !py-1 !text-xs !rounded-md !font-semibold !text-[#0047CC] disabled:!text-[#ADADAD]"
        disabled={disablePrev}
        onClick={() => onPageChange(-1)}
      >
        Prev
      </Button>
      <Button
        variant="outline"
        fullWidth={false}
        size="sm"
        pill={false}
        className="!min-h-0 !px-3.5 !py-1 !text-xs !rounded-md !font-semibold !text-[#0047CC] disabled:!text-[#ADADAD]"
        disabled={disableNext}
        onClick={() => onPageChange(1)}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
