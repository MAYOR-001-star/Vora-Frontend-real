import { ALIGNMENT_TAB_LABELS } from '../../../constants/alignmentReview';
import type { PaymentsTabType } from '../../../types/employer';

interface AlignmentReviewTabsProps {
  activeTab: PaymentsTabType;
  onTabChange: (tab: PaymentsTabType) => void;
}

const TAB_ORDER: PaymentsTabType[] = ['session', 'psychometric', 'sjt', 'video', 'overall'];

const AlignmentReviewTabs: React.FC<AlignmentReviewTabsProps> = ({ activeTab, onTabChange }) => (
  <div className="flex border-b border-[#E6E6E6] mb-5 overflow-x-auto scrollbar-hide gap-1">
    {TAB_ORDER.map((tab) => (
      <button
        key={tab}
        type="button"
        onClick={() => onTabChange(tab)}
        className={`pb-2.5 px-3.5 text-xs font-semibold border-b-2 -mb-px transition-all whitespace-nowrap outline-none cursor-pointer ${
          activeTab === tab
            ? 'text-[#0047CC] border-[#0047CC] font-bold'
            : 'text-[#808080] border-transparent hover:text-[#1A1A1A]'
        }`}
      >
        {ALIGNMENT_TAB_LABELS[tab]}
      </button>
    ))}
  </div>
);

export default AlignmentReviewTabs;
