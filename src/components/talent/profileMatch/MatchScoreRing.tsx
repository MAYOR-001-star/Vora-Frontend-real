import { useAnimatedScore } from '../../../hooks/useAnimatedScore';

interface MatchScoreRingProps {
  targetScore: number;
  label?: string;
  size?: number;
  strokeWidth?: number;
}

const MatchScoreRing: React.FC<MatchScoreRingProps> = ({
  targetScore,
  label = 'Profile Match',
  size = 152,
  strokeWidth = 12,
}) => {
  const score = useAnimatedScore({ target: targetScore });
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * score) / 100;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E6E6E6"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#2CA62C"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[34px] sm:text-[40px] font-black text-[#1A1A1A] leading-none">
          {score}%
        </span>
        <span className="text-[13px] font-bold text-[#1D871D] mt-0.5">{label}</span>
      </div>
    </div>
  );
};

export default MatchScoreRing;
