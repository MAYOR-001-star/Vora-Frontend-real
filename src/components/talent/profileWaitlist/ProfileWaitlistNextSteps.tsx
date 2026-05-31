import { PROFILE_WAITLIST_NEXT_STEPS } from '../../../constants/profileMatchWaitlist';

const ProfileWaitlistNextSteps: React.FC = () => (
  <div className="bg-white border border-[#E6E6E6] rounded-[10px] px-5 sm:px-[26px] py-5 sm:py-[22px] mb-4">
    <h3 className="text-[15px] font-bold text-[#1A1A1A] mb-3.5">What happens from here</h3>
    <div>
      {PROFILE_WAITLIST_NEXT_STEPS.map((step, index) => (
        <div
          key={step.title}
          className="flex items-start gap-3.5 py-2.5 border-b border-[#F7F7F7] last:border-0"
        >
          <span className="w-7 h-7 rounded-full bg-[#EBF6FF] border border-[#387DFF] text-[#0047CC] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
            {index + 1}
          </span>
          <p className="text-sm text-[#4A4A4A] leading-relaxed [&_strong]:text-[#1A1A1A] [&_strong]:font-bold">
            <strong>{step.title}</strong> {step.body}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default ProfileWaitlistNextSteps;
