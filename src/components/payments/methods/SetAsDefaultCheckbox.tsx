import React from 'react';

interface SetAsDefaultCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const SetAsDefaultCheckbox: React.FC<SetAsDefaultCheckboxProps> = ({
  checked = true,
  onChange,
}) => (
  <label className="flex items-center gap-2 cursor-pointer text-[13px] text-[#4A4A4A] font-semibold">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange?.(e.target.checked)}
      className="w-4 h-4 accent-[#0047CC]"
    />
    Set as default payment method
  </label>
);

export default SetAsDefaultCheckbox;
