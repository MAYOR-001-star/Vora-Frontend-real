import { InfoIcon } from '../../common/Icons';
import type { RolesFoundSummary } from '../../../types/talentRolesFound';

interface RolesFoundResultBannerProps {
  summary: RolesFoundSummary;
}

const RolesFoundResultBanner: React.FC<RolesFoundResultBannerProps> = ({ summary }) => (
  <div className="bg-[#EBF6FF] rounded-lg px-5 py-4 flex gap-3.5 items-start mb-5 sm:mb-[22px]">
    <div className="w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5">
      <InfoIcon size={18} strokeWidth={2.5} className="text-[#0047CC]" />
    </div>
    <div>
      <p className="text-sm font-semibold text-[#1A1A1A] mb-1.5">
        Not quite a match for that role — but VORA found you better ones.
      </p>
      <p className="text-[13px] text-[#4A4A4A] leading-relaxed mb-2.5 [&_strong]:font-extrabold [&_strong]:text-[#0047CC]">
        Your profile scored {summary.originalScore}% against{' '}
        <strong>{summary.originalRoleTitle}</strong> (threshold: {summary.matchThreshold}%). But VORA
        scanned your full profile — CV and onboarding details combined — against all live roles and
        found <strong>{summary.matchedRoleCount} you qualify for right now</strong>. Each is an{' '}
        {summary.matchThreshold}%+ profile match — meaning you go straight to assessment on any of
        them.
      </p>
      <p className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0047CC] bg-white rounded-full px-3 py-1">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        </svg>
        Profile score on original role: {summary.originalScore}% · Threshold:{' '}
        {summary.matchThreshold}%
      </p>
    </div>
  </div>
);

export default RolesFoundResultBanner;
