import { ProgressArc } from '../../common/Icons';
import type { RolesFoundSummary } from '../../../types/talentRolesFound';

interface RolesFoundStatsGridProps {
  summary: RolesFoundSummary;
}

const RolesFoundStatsGrid: React.FC<RolesFoundStatsGridProps> = ({ summary }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 border border-[#E6E6E6] rounded-lg overflow-hidden bg-[#E6E6E6] gap-px mb-6">
    <div className="bg-white px-5 py-[18px] col-span-2 sm:col-span-1">
      <p className="text-sm font-semibold text-[#1A1A1A] mb-2">Career Readiness Score</p>
      <div className="relative w-20 h-[46px] overflow-hidden mt-2 mb-2 mx-auto mt-0 lg:mt-4">
        <ProgressArc
          size={80}
          strokeWidth={8}
          percentage={summary.careerReadinessScore}
          color="#0047CC"
          background="#E6E6E6"
          className="absolute top-0 left-0"
        />
        <div className="absolute bottom-0 left-0 right-0 text-center text-xl font-black text-[#1A1A1A]">
          {summary.careerReadinessScore}%
        </div>
      </div>
    </div>

    <div className="bg-white px-5 py-[18px]">
      <p className="text-sm font-semibold text-[#1A1A1A] mb-2">Assessment Grade</p>
      <p className="text-xl font-black text-[#0047CC]">⚠ Grade {summary.assessmentGrade}</p>
      <p className="text-xs text-[#808080] mt-1">Based on your profile</p>
      <button type="button" className="text-xs text-[#0047CC] font-bold mt-1.5 cursor-pointer hover:underline">
        See how grades work →
      </button>
    </div>

    <div className="bg-white px-5 py-[18px]">
      <p className="text-sm font-semibold text-[#1A1A1A] mb-2">Roles You Match</p>
      <p className="text-[22px] font-black text-[#0047CC]">{summary.matchedRoleCount}</p>
      <p className="text-xs text-[#808080] mt-1">Go straight to assessment</p>
    </div>
  </div>
);

export default RolesFoundStatsGrid;
