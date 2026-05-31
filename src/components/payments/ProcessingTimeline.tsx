import React from 'react';
import { CheckIcon } from '../common/Icons';
import PaymentCard from './PaymentCard';
import type { TimelineStep } from '../../types/withdrawWallet';

interface ProcessingTimelineProps {
  steps: TimelineStep[];
  title?: string;
}

const ProcessingTimeline: React.FC<ProcessingTimelineProps> = ({
  steps,
  title = 'Processing Timeline',
}) => (
  <PaymentCard title={title} bodyClassName="px-5 py-4">
    <div className="py-1">
      {steps.map((step, index) => (
        <div key={step.title} className="flex gap-3 pb-5 last:pb-0 relative">
          {index < steps.length - 1 && (
            <span
              className="absolute left-4 top-8 bottom-0 w-0.5 bg-[#E6E6E6]"
              aria-hidden
            />
          )}
          <div
            className={`relative z-[1] w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 bg-white ${
              step.status === 'done'
                ? 'border-[#0047CC] bg-[#EBF6FF]'
                : step.status === 'active'
                  ? 'border-[#0047CC] bg-[#EBF6FF]'
                  : 'border-[#E6E6E6]'
            }`}
          >
            {step.status === 'done' ? (
              <CheckIcon size={14} className="text-[#0047CC]" strokeWidth={2.5} />
            ) : (
              <span
                className={`w-1 h-1 rounded-full ${
                  step.status === 'active' ? 'bg-[#0047CC]' : 'bg-[#ADADAD]'
                }`}
              />
            )}
          </div>
          <div className="pt-0.5 min-w-0">
            <p className="text-[13px] font-semibold text-[#1A1A1A] mb-0.5">{step.title}</p>
            <p className="text-[11px] text-[#808080]">{step.meta}</p>
          </div>
        </div>
      ))}
    </div>
  </PaymentCard>
);

export default ProcessingTimeline;
