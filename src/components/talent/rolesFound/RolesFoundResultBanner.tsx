import { InfoIcon, TrendingUpIcon } from '../../common/Icons';
import type { RolesFoundSummary } from '../../../types/talentRolesFound';

interface RolesFoundResultBannerProps {
  summary: RolesFoundSummary;
}

const RolesFoundResultBanner: React.FC<RolesFoundResultBannerProps> = ({ summary }) => (
  <div className="bg-white border border-[#E6E6E6] rounded-2xl px-6 py-5 flex gap-4 items-start mb-6">
    <div className="w-[42px] h-[42px] rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 mt-0.5 border border-[#E6E6E6]">
      <InfoIcon size={20} strokeWidth={2.5} className="text-[#0047CC]" />
    </div>
    <div>
      <p className="text-[15px] font-bold text-[#1A1A1A] mb-1.5 tracking-tight">
        Not quite a match for that role, but VORA found you better ones.
      </p>
      <p className="text-[13px] text-[#4A5568] leading-relaxed mb-3 [&_strong]:font-bold [&_strong]:text-[#1A1A1A]">
        Your profile scored {summary.originalScore}% against{' '}
        <strong>{summary.originalRoleTitle}</strong> (threshold: {summary.matchThreshold}%). But VORA
        scanned your full profile, CV and onboarding details combined, against all live roles and
        found <strong>{summary.matchedRoleCount} you qualify for right now</strong>. Each is an{' '}
        {summary.matchThreshold}%+ profile match, meaning you go straight to assessment on any of
        them.
      </p>
      <div className="inline-flex items-center gap-2 text-[11px] font-medium text-[#4A4A4A] bg-[#F7F7F7] border border-[#E6E6E6] rounded-full px-3 py-1.5">
        <TrendingUpIcon size={12} strokeWidth={2.5} className="text-[#808080]" />
        <span>
          Profile score on original role: <span className="font-bold text-[#1A1A1A]">{summary.originalScore}%</span> · Threshold:{' '}
          {summary.matchThreshold}%
        </span>
      </div>
    </div>
  </div>
);

export default RolesFoundResultBanner;
