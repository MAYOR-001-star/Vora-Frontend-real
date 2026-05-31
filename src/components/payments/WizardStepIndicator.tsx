import React from 'react';

interface WizardStepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

const WizardStepIndicator: React.FC<WizardStepIndicatorProps> = ({
  currentStep,
  totalSteps = 3,
}) => (
  <div className="flex items-center gap-2 mb-6" aria-label={`Step ${currentStep} of ${totalSteps}`}>
    {Array.from({ length: totalSteps }, (_, i) => {
      const step = i + 1;
      const isDone = step < currentStep;
      const isActive = step === currentStep;
      return (
        <React.Fragment key={step}>
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
              isDone
                ? 'bg-[#0047CC] text-white'
                : isActive
                  ? 'bg-[#0047CC] text-white'
                  : 'bg-[#E6E6E6] text-[#808080]'
            }`}
          >
            {step}
          </div>
          {step < totalSteps && (
            <div
              className={`flex-1 h-0.5 min-w-[12px] ${step < currentStep ? 'bg-[#0047CC]' : 'bg-[#E6E6E6]'}`}
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

export default WizardStepIndicator;
