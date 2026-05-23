import React from 'react';
import ChangeFlag from './ChangeFlag';

interface TrackedFieldProps {
  changed?: boolean;
  changeMessage?: string;
  children: React.ReactNode;
}

/** Wraps a form control and shows an amber change indicator when edited. */
const TrackedField: React.FC<TrackedFieldProps> = ({ changed, changeMessage, children }) => (
  <div>
    {children}
    {changed && changeMessage && <ChangeFlag message={changeMessage} />}
  </div>
);

export const changedInputClass = (changed?: boolean) =>
  changed ? 'border-[#D97706]! bg-[#FFFBEB]!' : '';

export default TrackedField;
