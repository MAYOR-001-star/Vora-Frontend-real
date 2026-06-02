interface ProfileMatchProgressBarProps {
  progress: number;
}

const ProfileMatchProgressBar: React.FC<ProfileMatchProgressBarProps> = ({ progress }) => (
  <div className="mb-2">
    <div className="h-2 bg-[#E6E6E6] rounded-full overflow-hidden mb-2">
      <div
        className="h-full bg-[#0047CC] rounded-full transition-[width] duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
    <p className="text-[13px] font-semibold text-[#0047CC] mb-2.5">{progress}%</p>
    <p className="text-xs text-[#ADADAD]">Please don&apos;t close this tab, we&apos;re almost there.</p>
  </div>
);

export default ProfileMatchProgressBar;
