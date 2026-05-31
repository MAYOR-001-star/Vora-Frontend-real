import PaymentCard from '../PaymentCard';
import { CheckIcon, CloseIcon } from '../../common/Icons';

const REFUND_POLICY_ITEMS = [
  {
    title: 'Hire',
    description: '$150 auto-refunded instantly',
    icon: 'check' as const,
  },
  {
    title: 'Reject – valid, documented',
    description: 'VORA reviews within 2 days · Refund if valid',
    icon: 'check' as const,
  },
  {
    title: 'Reject – no valid reason',
    description: 'Fee forfeited · Account warning issued',
    icon: 'close' as const,
  },
];

const RefundPolicyCard: React.FC = () => (
  <PaymentCard title="Refund Policy" className="!mb-4" bodyClassName="p-4 space-y-4 text-xs">
    {REFUND_POLICY_ITEMS.map((item) => (
      <div key={item.title} className="flex gap-2.5">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
            item.icon === 'check' ? 'bg-[#EEFBEE] text-[#1D871D]' : 'bg-[#FEF2F2] text-[#DC2626]'
          }`}
        >
          {item.icon === 'check' ? (
            <CheckIcon size={10} strokeWidth={3} />
          ) : (
            <CloseIcon size={10} />
          )}
        </div>
        <div>
          <div className="font-bold text-[#1A1A1A]">{item.title}</div>
          <div className="text-[10px] text-[#808080]">{item.description}</div>
        </div>
      </div>
    ))}
  </PaymentCard>
);

export default RefundPolicyCard;
