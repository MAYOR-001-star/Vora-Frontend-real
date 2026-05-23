import React from 'react';
import {
  TIME_COMMITMENT_PLACEHOLDER,
  TIME_COMMITMENT_SUFFIX,
  blockNegativeNumberKeys,
  parseTimeCommitmentDigits,
} from '../../utils/numericInput';

interface TimeCommitmentInputProps {
  label: string | React.ReactNode;
  value: string;
  onChange: (digits: string) => void;
  error?: boolean;
  helperText?: string;
  className?: string;
}

const inputBaseClass =
  'border-0 outline-none bg-transparent p-0 text-[14px] font-medium placeholder:text-gray-400 min-w-[1.5ch] transition-colors duration-200';

const TimeCommitmentInput: React.FC<TimeCommitmentInputProps> = ({
  label,
  value,
  onChange,
  error = false,
  helperText = '',
  className = '',
}) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-text-secondary mb-2.5">
      {label}
    </label>
    <div
      className={`group flex items-center w-full px-4 py-3 sm:py-3.5 rounded-lg border ${
        error ? 'border-red-500 bg-red-50' : 'border-border-default bg-white'
      } focus-within:outline-none focus-within:ring-2 ${
        error
          ? 'focus-within:ring-red-500/20 focus-within:border-red-500'
          : 'focus-within:ring-brand-blue/20 focus-within:border-brand-blue'
      } transition-all ${value ? 'justify-between' : ''} ${className}`}
    >
      <input
        type="text"
        inputMode="numeric"
        autoComplete="off"
        placeholder={TIME_COMMITMENT_PLACEHOLDER}
        value={value}
        onChange={(e) => onChange(parseTimeCommitmentDigits(e.target.value))}
        onKeyDown={blockNegativeNumberKeys}
        className={`${inputBaseClass} ${
          value ? 'flex-none text-[#1A1A1A]' : 'flex-1 w-full text-[#1A1A1A]'
        }`}
        size={value ? Math.max(value.length, 1) : undefined}
        style={value ? undefined : { width: '100%' }}
        aria-describedby={value ? 'time-commitment-suffix' : undefined}
      />
      {value ? (
        <span
          id="time-commitment-suffix"
          className="text-[14px] font-medium text-[#1A1A1A] pointer-events-none select-none whitespace-nowrap shrink-0"
          aria-hidden
        >
          {TIME_COMMITMENT_SUFFIX}
        </span>
      ) : null}
    </div>
    {error && helperText && (
      <p className="mt-1.5 text-xs text-red-500 font-medium ml-1">{helperText}</p>
    )}
  </div>
);

export default TimeCommitmentInput;
