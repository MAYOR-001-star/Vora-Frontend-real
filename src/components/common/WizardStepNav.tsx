import React from 'react';
import StepStatusIcon, { type StepStatus } from './StepStatusIcon';

export interface WizardStep {
  id: number;
  title: string;
  sub?: string;
}

interface WizardStepNavProps {
  steps: WizardStep[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
  size?: 'sm' | 'md';
  className?: string;
}

const getStepStatus = (stepId: number, currentStep: number): StepStatus => {
  if (currentStep > stepId) return 'completed';
  if (currentStep === stepId) return 'current';
  return 'upcoming';
};

const labelStyles: Record<StepStatus, string> = {
  completed: 'text-[#1A1A1A] font-medium',
  current: 'text-[#0047CC] font-medium',
  upcoming: 'text-[#ADADAD] font-medium',
};

const WizardStepNav: React.FC<WizardStepNavProps> = ({
  steps,
  currentStep,
  onStepClick,
  size = 'md',
  className = '',
}) => {
  const isInteractive = Boolean(onStepClick);
  const textSize = size === 'sm' ? 'text-[13px]' : 'text-sm';

  return (
    <nav className={className} aria-label="Wizard progress">
      <div className="space-y-0">
        {steps.map((step) => {
          const status = getStepStatus(step.id, currentStep);
          const content = (
            <>
              <StepStatusIcon status={status} size={size} />
              <div>
                <p className={`${textSize} tracking-tight leading-tight ${labelStyles[status]}`}>
                  {step.title}
                </p>
              </div>
            </>
          );

          if (isInteractive) {
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onStepClick?.(step.id)}
                className="flex items-center gap-3 px-6 py-2 w-full text-left hover:bg-gray-50 cursor-pointer"
              >
                {content}
              </button>
            );
          }

          return (
            <div key={step.id} className={`flex items-center gap-3 px-6 ${size === 'sm' ? 'py-2' : 'py-3'}`}>
              {content}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default WizardStepNav;
