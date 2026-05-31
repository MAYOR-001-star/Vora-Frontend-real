import React from 'react';
import Select from '../common/Select';
import { SearchIcon } from '../common/Icons';
import {
  TRANSACTION_DATE_FILTER_OPTIONS,
  TRANSACTION_STATUS_FILTER_OPTIONS,
  TRANSACTION_TYPE_FILTER_OPTIONS,
} from '../../constants/transactionsList';

interface TransactionFiltersBarProps {
  search: string;
  type: string;
  status: string;
  dateRange?: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDateRangeChange?: (value: string) => void;
}

const filterSelectClass =
  '!py-2 !pl-2.5 !pr-2 !text-xs !min-h-0 !rounded-lg !font-medium whitespace-nowrap';

const TransactionFiltersBar: React.FC<TransactionFiltersBarProps> = ({
  search,
  type,
  status,
  dateRange = '',
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onDateRangeChange,
}) => (
  <div className="flex flex-wrap gap-2.5 mb-5 items-center">
    <div className="relative flex-1 min-w-[200px]">
      <SearchIcon
        size={14}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#ADADAD] pointer-events-none"
      />
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search transactions…"
        className="w-full py-2 pl-9 pr-3 border border-[#E6E6E6] rounded-lg text-[13px] text-[#1A1A1A] bg-white outline-none focus:border-[#387DFF]"
      />
    </div>

    <div className="w-auto min-w-[118px]">
      <Select
        hideLabel
        value={type}
        options={TRANSACTION_TYPE_FILTER_OPTIONS}
        onChange={(e) => onTypeChange(e.target.value)}
        className={filterSelectClass}
        menuClassName="min-w-[11.5rem]"
      />
    </div>

    <div className="w-auto min-w-[118px]">
      <Select
        hideLabel
        value={status}
        options={TRANSACTION_STATUS_FILTER_OPTIONS}
        onChange={(e) => onStatusChange(e.target.value)}
        className={filterSelectClass}
        menuClassName="min-w-[9.5rem]"
      />
    </div>

    <div className="w-auto min-w-[108px] opacity-60 pointer-events-none">
      <Select
        hideLabel
        value={dateRange}
        options={TRANSACTION_DATE_FILTER_OPTIONS}
        onChange={(e) => onDateRangeChange?.(e.target.value)}
        className={filterSelectClass}
        menuClassName="min-w-[9rem]"
      />
    </div>
  </div>
);

export default TransactionFiltersBar;
