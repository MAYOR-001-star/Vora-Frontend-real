import { useMemo } from 'react';
import { SCORE_BAR_FILL } from '../../payments/alignment/scoreBarStyles';
import { useStaggeredBarWidths } from '../../../hooks/useStaggeredBarWidths';
import type { ProfileMatchBreakdownItem } from '../../../constants/profileMatchResult';

interface ProfileMatchBreakdownProps {
  items: ProfileMatchBreakdownItem[];
  title?: string;
}

const pctColor = (barColor: ProfileMatchBreakdownItem['barColor']) =>
  barColor === 'primary' ? 'text-[#0047CC]' : 'text-[#2CA62C]';

const ProfileMatchBreakdown: React.FC<ProfileMatchBreakdownProps> = ({
  items,
  title = 'How your profile matched',
}) => {
  const barTargets = useMemo(
    () => items.map((item, index) => ({ id: `bar-${index}`, pct: item.pct })),
    [items],
  );
  const widths = useStaggeredBarWidths({ bars: barTargets });

  return (
    <div className="bg-white border border-[#E6E6E6] rounded-xl px-5 sm:px-[26px] py-5 sm:py-[22px] mb-5">
      <h3 className="text-[15px] font-extrabold text-[#1A1A1A] mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => {
          const barId = `bar-${index}`;
          return (
            <div key={item.label} className="flex items-center gap-3 sm:gap-3.5">
              <span className="text-[13px] sm:text-sm font-semibold text-[#4A4A4A] w-[110px] sm:w-[150px] shrink-0 truncate">
                {item.label}
              </span>
              <div className="flex-1 h-2 bg-[#E6E6E6] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-[width] duration-[600ms] ease-out ${SCORE_BAR_FILL[item.barColor]}`}
                  style={{ width: `${widths[barId] ?? 0}%` }}
                />
              </div>
              <span
                className={`text-[13px] font-bold w-[38px] text-right shrink-0 ${pctColor(item.barColor)}`}
              >
                {item.pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileMatchBreakdown;
