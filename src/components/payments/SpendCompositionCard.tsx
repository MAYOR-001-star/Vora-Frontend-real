import React from 'react';
import PaymentCard from './PaymentCard';
import type { SpendCompositionItem } from '../../types/paymentsOverview';

interface SpendCompositionCardProps {
  items: SpendCompositionItem[];
}

const SpendCompositionCard: React.FC<SpendCompositionCardProps> = ({ items }) => (
  <PaymentCard title="Escrow composition" bodyClassName="px-5 py-4">
    {items.map((item) => (
      <div key={item.label} className="mb-3.5 last:mb-0">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[#4A4A4A] font-medium">{item.label}</span>
          <span className="text-[#1A1A1A] font-semibold">{item.value}</span>
        </div>
        <div className="h-[5px] bg-[#E6E6E6] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-500"
            style={{ width: `${item.percent}%`, backgroundColor: item.barColor }}
          />
        </div>
      </div>
    ))}
  </PaymentCard>
);

export default SpendCompositionCard;
