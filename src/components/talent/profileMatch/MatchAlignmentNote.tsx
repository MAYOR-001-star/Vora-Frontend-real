const MatchAlignmentNote: React.FC = () => (
  <div className="bg-[#EBF6FF] border border-[#387DFF] rounded-[10px] px-[22px] py-[18px] flex flex-col sm:flex-row gap-2.5 sm:gap-3.5 items-start">
    <div className="w-[30px] sm:w-9 h-[30px] sm:h-9 rounded-full bg-white flex items-center justify-center shrink-0">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0047CC" strokeWidth="2.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    </div>
    <div>
      <p className="text-sm font-bold text-[#1A1A1A] mb-1.5">
        One possible final step — and it is a great sign
      </p>
      <p className="text-[13px] text-[#4A4A4A] leading-relaxed [&_strong]:font-bold [&_strong]:text-[#0047CC]">
        Some employers add a brief <strong>team alignment session</strong> (video or in-person)
        after assessment — a short conversation to check team culture fit and working style. Not
        every role has one. But if you are invited to one,{' '}
        <strong>treat it as a near-certain offer</strong>. The technical screening is done; they
        are just deciding where to seat you.
      </p>
    </div>
  </div>
);

export default MatchAlignmentNote;
