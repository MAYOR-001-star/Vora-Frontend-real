import PaymentCard from '../PaymentCard';

interface FeeLine {
  name: string;
  amount: number;
}

interface AlignmentFeesSummaryCardProps {
  lines: FeeLine[];
  totalHeld: number;
}

const AlignmentFeesSummaryCard: React.FC<AlignmentFeesSummaryCardProps> = ({ lines, totalHeld }) => (
  <PaymentCard
    title="Alignment Fees Summary"
    className="!mb-4"
    bodyClassName="p-4 space-y-2.5 text-xs text-[#808080]"
  >
    {lines.map((line) => (
      <div key={line.name} className="flex justify-between font-medium">
        <span>{line.name}</span>
        <span className="font-bold text-[#D97706]">
          {line.amount > 0 ? `$${line.amount.toFixed(2)}` : '$0.00'}
        </span>
      </div>
    ))}
    <div className="flex justify-between pt-2.5 border-t-2 border-[#F7F7F7] font-bold text-[#1A1A1A]">
      <span>Total held</span>
      <span className="text-[#D97706] text-sm">${totalHeld.toFixed(2)}</span>
    </div>
    <p className="text-[10px] text-[#808080] leading-relaxed pt-1">
      Both hired → <strong className="text-[#1D871D]">$300 refunded</strong>
      <br />
      Both rejected valid → refunded
      <br />
      Both rejected invalid → <strong className="text-[#DC2626]">$300 forfeited + 2 warnings</strong>
    </p>
  </PaymentCard>
);

export default AlignmentFeesSummaryCard;
