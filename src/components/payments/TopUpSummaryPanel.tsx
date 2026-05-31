import React from 'react';
import PaymentCard from './PaymentCard';
import { formatUsd } from '../../utils/topUpWallet';

interface TopUpSummaryPanelProps {
  amount: number;
  fee: number;
  total: number;
}

const TopUpSummaryPanel: React.FC<TopUpSummaryPanelProps> = ({ amount, fee, total }) => (
  <PaymentCard title="Top-Up Summary" bodyClassName="px-5 py-4">
    <div className="bg-[#F7F7F7] border border-[#E6E6E6] rounded-[10px] p-4">
      <div className="flex justify-between text-[13px] py-1.5 border-b border-[#E6E6E6]">
        <span className="text-[#808080]">Amount</span>
        <span className="font-semibold text-[#1A1A1A]">{formatUsd(amount)}</span>
      </div>
      <div className="flex justify-between text-[13px] py-1.5 border-b border-[#E6E6E6]">
        <span className="text-[#808080]">Processing fee</span>
        <span className="font-semibold text-[#1A1A1A]">{formatUsd(fee)}</span>
      </div>
      <div className="flex justify-between text-sm font-semibold pt-2.5 mt-0.5">
        <span className="text-[#1A1A1A]">You will pay</span>
        <span className="text-[#0047CC] text-[15px]">{formatUsd(total)}</span>
      </div>
    </div>
    <div className="mt-3.5 text-xs text-[#808080] leading-relaxed space-y-1.5">
      <p>
        <strong className="text-[#4A4A4A] font-semibold">Funds available:</strong> Instantly (Stripe /
        Paystack / Flutterwave) or 1–3 days (bank transfer)
      </p>
      <p>
        <strong className="text-[#4A4A4A] font-semibold">Card fee:</strong> 1.4% + $0.30 (Stripe) · varies
        by channel (Paystack / Flutterwave)
      </p>
    </div>
  </PaymentCard>
);

export default TopUpSummaryPanel;
