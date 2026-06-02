interface JobPostedStatsBarProps {
  candidatesMatched: number;
  positionsOpen: number;
}

const JobPostedStatsBar: React.FC<JobPostedStatsBarProps> = ({
  candidatesMatched,
  positionsOpen,
}) => (
  <div className="grid grid-cols-3 divide-x divide-[#E6E6E6] border border-[#E6E6E6] rounded-xl overflow-hidden mb-6 bg-white">
    <div className="px-4 py-5 text-center">
      <div className="text-[28px] font-bold text-[#0047CC] leading-none">{candidatesMatched}</div>
      <p className="text-[11px] text-[#808080] mt-2 leading-snug">Candidates matched so far</p>
    </div>
    <div className="px-4 py-5 text-center">
      <div className="text-[28px] font-bold text-[#0047CC] leading-none">{positionsOpen}</div>
      <p className="text-[11px] text-[#808080] mt-2 leading-snug">Positions open</p>
    </div>
    <div className="px-4 py-5 text-center">
      <div className="flex items-center justify-center">
        <span className="text-[28px] font-bold text-[#0047CC] leading-none">Live</span>
      </div>
      <p className="text-[11px] text-[#808080] mt-2 leading-snug">Role status</p>
    </div>
  </div>
);

export default JobPostedStatsBar;
