import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from './Icons';

import type { Option, SelectProps } from '../../types';

const Select: React.FC<SelectProps> = ({ 
  label = '',
  hideLabel = false,
  variant = 'default',
  menuClassName = '',
  name,
  options = [], 
  groups,
  value = '',
  placeholder = "Select an option", 
  error = false,
  helperText = '',
  hint = '',
  className = '',
  onChange,
  onBlur,
}) => {
  const isInline = variant === 'inline';
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Find selected label from flat options or groups
  const findSelectedLabel = (): string => {
    if (groups) {
      for (const group of groups) {
        const found = group.options.find(o => o.value === value);
        if (found) return found.label;
      }
      return '';
    }
    return options.find(o => o.value === value)?.label || '';
  };

  const selectedLabel = findSelectedLabel();

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: { name: name || '', value: optionValue },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen && onBlur) {
      onBlur();
    }
  };

  const renderOption = (option: Option) => {
    const isSelected = option.value === value;

    if (isInline) {
      return (
        <button
          key={option.value}
          type="button"
          onClick={() => handleSelect(option.value)}
          className={`w-full text-center px-2 py-1.5 text-sm rounded-md transition-colors cursor-pointer ${
            isSelected
              ? 'bg-white text-[#0047CC] font-bold'
              : 'text-[#4A4A4A] hover:bg-[#EBF6FF] hover:text-[#0047CC]'
          }`}
        >
          {option.label}
        </button>
      );
    }

    return (
      <button
        key={option.value}
        type="button"
        onClick={() => handleSelect(option.value)}
        className={`w-full text-left px-3 py-2 text-[13px] rounded-lg transition-colors cursor-pointer mb-0.5 last:mb-0 whitespace-nowrap ${
          isSelected
            ? 'bg-[#0047CC] text-white font-medium'
            : option.italic
              ? 'text-[#808080] italic hover:bg-gray-50'
              : 'text-[#374151] hover:bg-gray-50'
        }`}
      >
        {option.label}
      </button>
    );
  };

  const menuClass = isInline
    ? `absolute left-1/2 -translate-x-1/2 top-full mt-1 z-20 w-[4.75rem] rounded-lg bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] p-1 max-h-44 overflow-y-auto custom-scrollbar border-0 ${menuClassName}`
    : `absolute z-20 mt-1.5 w-full min-w-full rounded-xl border border-border-default bg-white shadow-lg p-1.5 max-h-72 overflow-y-auto custom-scrollbar ${menuClassName}`;

  const triggerClass = isInline
    ? `w-auto min-w-[3.25rem] px-1 py-0.5 rounded-md border-0 bg-transparent font-bold text-sm hover:bg-[#F7F7F7] focus:outline-none transition-all cursor-pointer flex items-center justify-center gap-0.5 ${isOpen || value ? 'text-[#0047CC]' : 'text-[#1A1A1A]'} ${className}`
    : `w-full px-4 py-3 sm:py-3.5 rounded-lg border ${error ? 'border-red-500 bg-red-50' : 'border-border-default bg-white'} focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500/20 focus:border-red-500' : 'focus:ring-brand-blue/20 focus:border-brand-blue'} transition-all cursor-pointer flex items-center justify-between text-left ${className}`;

  return (
    <div
      className={isInline ? 'w-auto' : 'w-full'}
      ref={containerRef}
      onMouseDown={isInline ? (e) => e.stopPropagation() : undefined}
    >
      {!hideLabel && label !== '' && (
        <label className="block text-sm font-medium text-text-secondary mt-1 mb-3">
          {label}
        </label>
      )}
      <div className={`relative ${isOpen ? 'z-20' : ''}`}>
        <button
          type="button"
          onClick={handleToggle}
          className={triggerClass}
        >
          <span className={value ? (isInline ? 'text-inherit' : 'text-text-secondary') : 'text-gray-400'}>
            {selectedLabel || placeholder}
          </span>
          <ChevronDownIcon
            size={isInline ? 12 : 16}
            className={`flex-shrink-0 transition-transform duration-200 ${
              isInline ? (isOpen ? 'text-[#0047CC] rotate-180' : 'text-[#808080]') : `text-gray-400 ${isOpen ? 'rotate-180' : ''}`
            }`}
          />
        </button>

        {isOpen && (
          <div className={menuClass}>
            {groups ? (
              groups.map((group, gIdx) => (
                <div key={group.label}>
                  {gIdx > 0 && (
                    <div className="h-px bg-[#E6E6E6] my-1" />
                  )}
                  <div className="px-4 py-2 text-[11px] font-medium text-[#ADADAD] uppercase tracking-wider">
                    {group.label}
                  </div>
                  {group.options.map(renderOption)}
                </div>
              ))
            ) : (
              options.map(renderOption)
            )}
          </div>
        )}
      </div>
      {hint && !error && (
        <p className="mt-1.5 text-xs text-[#808080] ml-0.5 leading-relaxed">{hint}</p>
      )}
      {error && helperText && (
        <p className="mt-1.5 text-xs text-red-500 font-medium ml-1">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Select;
