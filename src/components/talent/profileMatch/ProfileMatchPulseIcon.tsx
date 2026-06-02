const ProfileMatchPulseIcon: React.FC = () => (
    <div className="relative w-[88px] h-[88px] mx-auto mb-7">
      <span
        className="absolute rounded-full border-2 border-[#387DFF] animate-[profile-match-pulse_2s_ease-out_infinite]"
        aria-hidden
      />
      <span
        className="absolute rounded-full border-2 border-[#387DFF] animate-[profile-match-pulse_2s_ease-out_infinite]"
        style={{ animationDelay: '0.75s' }}
        aria-hidden
      />
    <div className="relative z-[2] w-[88px] h-[88px] rounded-full bg-white border-2 border-[#387DFF] flex items-center justify-center">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0047CC"
        strokeWidth="2.5"
        aria-hidden
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  </div>
);

export default ProfileMatchPulseIcon;
