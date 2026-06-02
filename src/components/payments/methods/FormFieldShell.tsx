import React from 'react';
import { PAYMENT_METHOD_FIELD_LABEL_CLASS } from './paymentMethodFormStyles';

interface FormFieldShellProps {
  label: string;
  error?: boolean;
  helperText?: string;
  children: React.ReactNode;
}

const inputErrorClass = 'border-red-500 bg-white focus:border-red-500 focus:ring-red-500/20';
const inputOkClass =
  'border-border-default bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue';

export const formControlClass = (error?: boolean) =>
  `w-full px-4 py-3 rounded-lg border text-sm transition-colors ${error ? inputErrorClass : inputOkClass}`;

const FormFieldShell: React.FC<FormFieldShellProps> = ({ label, error, helperText, children }) => (
  <div>
    <label className={PAYMENT_METHOD_FIELD_LABEL_CLASS}>{label}</label>
    {children}
    {error && helperText && (
      <p className="mt-1.5 text-xs text-red-500 font-medium ml-1">{helperText}</p>
    )}
  </div>
);

export default FormFieldShell;
