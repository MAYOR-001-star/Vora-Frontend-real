import React from 'react';
import PaymentCard from './PaymentCard';
import { formatUsd } from '../../utils/topUpWallet';
import { formatWithdrawFee } from '../../utils/withdrawWallet';
import type { WithdrawMethod } from '../../types/withdrawWallet';

interface WithdrawSummaryPanelProps {
  amount: number;
  method: WithdrawMethod;
  remainingBalance: number;
}

const WithdrawSummaryPanel: React.FC<WithdrawSummaryPanelProps> = ({
  amount,
  method,
  remainingBalance,
}) => {
  const fee = amount > 0 && method === 'stripe' ? amount * 0.0025 : 0;
  const feeRounded = Math.round(fee * 100) / 100;
  const net = Math.max(0, amount - feeRounded);

  return (
    <PaymentCard title="Withdrawal Summary" bodyClassName="px-5 py-4">
      <div className="flex justify-between text-[13px] py-1.5 border-b border-[#F7F7F7]">
        <span className="text-[#808080]">Amount</span>
        <span className="font-semibold text-[#1A1A1A]">{formatUsd(amount)}</span>
      </div>
      <div className="flex justify-between text-[13px] py-1.5 border-b border-[#F7F7F7]">
        <span className="text-[#808080]">Processing fee</span>
        <span className="font-semibold text-[#1A1A1A]">{formatWithdrawFee(amount, method)}</span>
      </div>
      <div className="flex justify-between text-sm font-semibold py-2.5">
        <span className="text-[#808080]">You will receive</span>
        <span className="text-[#0047CC] text-[15px]">{formatUsd(net)}</span>
      </div>
      <div className="flex justify-between text-[13px] pt-1">
        <span className="text-[#808080]">Remaining balance</span>
        <span className="font-semibold text-[#1A1A1A]">{formatUsd(remainingBalance)}</span>
      </div>
    </PaymentCard>
  );
};

export default WithdrawSummaryPanel;
