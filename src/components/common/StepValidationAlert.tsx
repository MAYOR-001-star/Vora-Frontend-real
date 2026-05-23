import React from 'react';

interface StepValidationAlertProps {
  errors: Record<string, string>;
}

const StepValidationAlert: React.FC<StepValidationAlertProps> = ({ errors }) => {
  const messages = Object.values(errors);
  if (messages.length === 0) return null;

  return (
    <div
      className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl"
      role="alert"
    >
      <p className="text-sm font-bold text-red-800">Please fix the following before continuing:</p>
      <ul className="mt-2 space-y-1 list-disc pl-5 text-sm text-red-700">
        {messages.map((msg) => (
          <li key={msg}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default StepValidationAlert;
