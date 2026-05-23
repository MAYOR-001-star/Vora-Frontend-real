import React, { useMemo, useState } from 'react';
import { ChevronDownIcon } from './Icons';
import Select from './Select';
import {
  formatDateDisplay,
  getCalendarGrid,
  isAfterDay,
  isBeforeDay,
  isSameDay,
  parseISODate,
  toISODate,
} from '../../utils/date';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const;

export interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ value = '', onChange, min, max, className = '' }) => {
  const selected = parseISODate(value);
  const minDate = min ? parseISODate(min) : null;
  const maxDate = max ? parseISODate(max) : null;
  const today = useMemo(() => new Date(), []);

  const initialView = selected ?? today;
  const [viewYear, setViewYear] = useState(initialView.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialView.getMonth());

  const grid = useMemo(() => getCalendarGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  const monthLabel = useMemo(
    () => new Date(viewYear, viewMonth, 1).toLocaleDateString('en-US', { month: 'long' }),
    [viewYear, viewMonth]
  );

  const yearSelectOptions = useMemo(() => {
    const startYear = minDate?.getFullYear() ?? today.getFullYear();
    const endYear = maxDate?.getFullYear() ?? today.getFullYear() + 10;
    const years: { label: string; value: string }[] = [];
    for (let y = startYear; y <= endYear; y += 1) {
      years.push({ label: String(y), value: String(y) });
    }
    return years;
  }, [minDate, maxDate, today]);

  const shiftMonth = (delta: number) => {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  const isDisabled = (date: Date): boolean => {
    if (minDate && isBeforeDay(date, minDate)) return true;
    if (maxDate && isAfterDay(date, maxDate)) return true;
    return false;
  };

  return (
    <div
      className={`bg-white border border-[#E6E6E6] rounded-xl shadow-lg p-2.5 w-[252px] shrink-0 overflow-visible ${className}`}
      role="dialog"
      aria-label="Choose date"
    >
      <div className="relative flex items-center justify-between mb-3 px-1 overflow-visible">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          className="p-1 rounded-md hover:bg-[#F7F7F7] text-[#4A4A4A] cursor-pointer"
          aria-label="Previous month"
        >
          <ChevronDownIcon size={16} className="rotate-90" />
        </button>
        <div className="flex items-center justify-center gap-1.5 min-w-0">
          <span className="text-sm font-bold text-[#1A1A1A] shrink-0">{monthLabel}</span>
          <Select
            hideLabel
            variant="inline"
            value={String(viewYear)}
            options={yearSelectOptions}
            onChange={(e) => setViewYear(Number(e.target.value))}
            menuClassName="!z-[920]"
          />
        </div>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          className="p-1 rounded-md hover:bg-[#F7F7F7] text-[#4A4A4A] cursor-pointer"
          aria-label="Next month"
        >
          <ChevronDownIcon size={16} className="-rotate-90" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {WEEKDAYS.map((day) => (
          <div key={day} className="text-center text-[11px] font-bold text-[#808080] py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {grid.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="h-8" />;
          }

          const selectedDay = selected && isSameDay(date, selected);
          const isToday = isSameDay(date, today);
          const disabled = isDisabled(date);

          return (
            <button
              key={toISODate(date)}
              type="button"
              disabled={disabled}
              onClick={() => onChange(toISODate(date))}
              className={`h-8 w-full text-[12px] font-semibold rounded-md transition-colors cursor-pointer ${
                selectedDay
                  ? 'bg-[#0047CC] text-white'
                  : disabled
                    ? 'text-[#ADADAD] cursor-not-allowed'
                    : isToday
                      ? 'text-[#0047CC] ring-1 ring-[#0047CC] hover:bg-[#EBF6FF]'
                      : 'text-[#1A1A1A] hover:bg-[#EBF6FF]'
              }`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E6E6E6]">
        <button
          type="button"
          onClick={() => onChange('')}
          className="text-[13px] font-semibold text-[#0047CC] hover:underline cursor-pointer"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => onChange(toISODate(today))}
          className="text-[13px] font-semibold text-[#0047CC] hover:underline cursor-pointer"
        >
          Today
        </button>
      </div>
    </div>
  );
};

export { formatDateDisplay };
export default DatePicker;
