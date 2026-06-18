import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { ChevronRightIcon } from '../common/Icons';
import { SectionTitle } from '../common/Typography';
import { MATCH_CTA_STEPS } from '../../constants/roleLanding';

interface RoleMatchCtaBannerProps {
  roleSlug?: string;
}

const RoleMatchCtaBanner: React.FC<RoleMatchCtaBannerProps> = ({ roleSlug }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-[#BDD9FF] rounded-[10px] px-5 py-6 sm:px-8 sm:py-7 mb-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
      <div className="flex-1 min-w-0">
        <SectionTitle as="h2" className="text-lg text-[#1A1A1A] mb-1.5">
          Think you&apos;re a fit? Let VORA decide in minutes.
        </SectionTitle>
        <p className="text-[13px] font-normal text-[#4A4A4A] leading-relaxed mb-4">
          Sign up, complete your onboarding, upload your CV, and VORA instantly checks if your
          profile matches this role, and hundreds of others. Your profile = your CV + what you
          told us about yourself. Together, they&apos;re your match score.
        </p>
        <div className="flex flex-wrap gap-2">
          {MATCH_CTA_STEPS.map((label, index) => (
            <div
              key={label}
              className="inline-flex items-center gap-1.5 bg-white border border-[#BDD9FF] rounded-full px-3.5 py-1.5 text-xs font-medium text-[#0047CC]"
            >
              <span className="w-5 h-5 rounded-full bg-[#0047CC] text-white flex items-center justify-center text-[11px] font-semibold shrink-0">
                {index + 1}
              </span>
              {label}
            </div>
          ))}
        </div>
      </div>
      <Button
        type="button"
        variant="primary"
        size="lg"
        pill
        fullWidth={false}
        onClick={() => navigate(roleSlug ? `/role/${roleSlug}/signup` : '/signup')}
        className="w-full lg:w-auto shrink-0"
      >
        Check if I match
      </Button>
    </div>
  );
};

export default RoleMatchCtaBanner;
