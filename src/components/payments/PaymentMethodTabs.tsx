import React from 'react';
import ScrollArea from '../common/ScrollArea';
import type { TopUpMethodTab, TopUpPaymentMethod } from '../../types/topUpWallet';

interface PaymentMethodTabsProps {
  tabs: TopUpMethodTab[];
  active: TopUpPaymentMethod;
  onChange: (id: TopUpPaymentMethod) => void;
}

const PaymentMethodTabs: React.FC<PaymentMethodTabsProps> = ({ tabs, active, onChange }) => (
  <ScrollArea
    orientation="horizontal"
    className="border-b border-[#E6E6E6] mb-6 -mx-1"
  >
    <div className="flex px-1 min-w-min" role="tablist">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        type="button"
        role="tab"
        aria-selected={active === tab.id}
        onClick={() => onChange(tab.id)}
        className={`shrink-0 bg-transparent border-none px-5 py-2.5 text-sm font-semibold cursor-pointer border-b-2 -mb-px transition-colors whitespace-nowrap ${
          active === tab.id
            ? 'text-[#0047CC] border-[#0047CC]'
            : 'text-[#808080] border-transparent hover:text-[#1A1A1A]'
        }`}
      >
        {tab.label}
      </button>
    ))}
    </div>
  </ScrollArea>
);

export default PaymentMethodTabs;
