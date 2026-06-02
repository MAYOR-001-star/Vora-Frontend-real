import React from 'react';
import { CreditCardIcon, BankIcon } from '../common/Icons';
import type { WithdrawMethod } from '../../types/withdrawWallet';

interface WithdrawMethodCardProps {
  id: WithdrawMethod;
  name: string;
  subtitle: string;
  selected: boolean;
  onSelect: (id: WithdrawMethod) => void;
}



const WithdrawMethodCard: React.FC<WithdrawMethodCardProps> = ({
  id,
  name,
  subtitle,
  selected,
  onSelect,
}) => (
  <button
    type="button"
    onClick={() => onSelect(id)}
    className={`w-full text-left border-2 rounded-[10px] p-4 mb-2.5 flex items-start gap-3.5 cursor-pointer transition-colors ${
      selected
        ? 'border-[#0047CC] bg-white'
        : 'border-[#E6E6E6] bg-white hover:border-[#387DFF] hover:bg-white'
    }`}
  >
    <input
      type="radio"
      name="withdraw-method"
      checked={selected}
      readOnly
      className="mt-1 accent-[#0047CC] shrink-0"
    />
    <div
      className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${
        selected ? 'bg-[#0047CC] text-white' : 'bg-[#F7F7F7] text-[#4A4A4A]'
      }`}
    >
      {id === 'bank' ? <BankIcon /> : <CreditCardIcon size={18} />}
    </div>
    <div className="min-w-0">
      <p className="text-sm font-semibold text-[#1A1A1A] mb-0.5">{name}</p>
      <p className="text-xs text-[#808080] leading-snug">{subtitle}</p>
    </div>
  </button>
);

export default WithdrawMethodCard;
