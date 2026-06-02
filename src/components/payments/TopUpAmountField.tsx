import React from 'react';

interface TopUpAmountFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  presets: number[];
  activePreset?: number | null;
  onPresetSelect: (amount: number) => void;
  min?: number;
  hint?: React.ReactNode;
  formatPresetLabel?: (preset: number) => string;
}

const inputClass =
  'w-full pl-8 pr-4 py-3 sm:py-3.5 rounded-lg border border-border-default bg-white text-[#1A1A1A] text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all placeholder:text-gray-400';

const TopUpAmountField: React.FC<TopUpAmountFieldProps> = ({
  label = 'Amount to Add',
  value,
  onChange,
  presets,
  activePreset = null,
  onPresetSelect,
  min = 10,
  hint,
  formatPresetLabel = (preset) => `$${preset.toLocaleString()}`,
}) => (
  <div className="mb-[18px]">
    <label className="block text-sm font-medium text-text-secondary mb-2.5">{label}</label>
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#808080] pointer-events-none">
        $
      </span>
      <input
        type="number"
        value={value}
        min={min}
        step="0.01"
        placeholder="0.00"
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
    {presets.length > 0 && (
    <div className="flex flex-wrap gap-2 mt-2">
      {presets.map((preset) => (
        <button
          key={preset}
          type="button"
          onClick={() => onPresetSelect(preset)}
          className={`px-3.5 py-1.5 rounded-lg border text-[13px] font-semibold cursor-pointer transition-colors ${
            activePreset === preset
              ? 'border-[#0047CC] bg-white text-[#0047CC]'
              : 'border-[#E6E6E6] bg-white text-[#4A4A4A] hover:border-[#0047CC] hover:bg-white hover:text-[#0047CC]'
          }`}
        >
          {formatPresetLabel(preset)}
        </button>
      ))}
    </div>
    )}
    {hint && <p className="text-[11px] text-[#808080] mt-2 leading-snug">{hint}</p>}
  </div>
);

export default TopUpAmountField;
