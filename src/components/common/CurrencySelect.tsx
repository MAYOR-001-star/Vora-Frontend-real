import React from 'react';
import Select from './Select';
import { GLOBAL_CURRENCY_GROUPS } from '../../constants/currencies';
import type { Option, OptionGroup } from '../../types';

interface CurrencySelectProps {
  value: string;
  onChange: (currency: string) => void;
  groups?: OptionGroup[];
  options?: Option[];
  className?: string;
  menuClassName?: string;
}

/** Compact currency picker using the shared Select dropdown. */
const CurrencySelect: React.FC<CurrencySelectProps> = ({
  value,
  onChange,
  groups = GLOBAL_CURRENCY_GROUPS,
  options,
  className = '',
  menuClassName = 'max-h-80',
}) => (
  <div className="w-full min-w-0">
    <Select
      hideLabel
      value={value}
      groups={options ? undefined : groups}
      options={options}
      placeholder="Currency"
      onChange={(e) => onChange(e.target.value)}
      className={`!py-3 !px-3.5 text-xs font-medium text-[#1A1A1A] ${className}`}
      menuClassName={menuClassName}
    />
  </div>
);

export default CurrencySelect;
