import React from 'react';
import AlertBanner from '../../common/AlertBanner';
import Button from '../../common/Button';
import { CheckIcon } from '../../common/Icons';
import { WITHDRAW_METHOD_LABELS } from '../../../constants/withdrawWallet';
import { calculateWithdrawFee, formatWithdrawFee } from '../../../utils/withdrawWallet';
import { formatUsd } from '../../../utils/topUpWallet';
import type { WithdrawMethod } from '../../../types/withdrawWallet';

interface WithdrawStepConfirmProps {
  amount: number;
  method: WithdrawMethod;
  onConfirm: () => void;
}

const WithdrawStepConfirm: React.FC<WithdrawStepConfirmProps> = ({
  amount,
  method,
  onConfirm,
}) => {
  const fee = calculateWithdrawFee(amount, method);
  const net = Math.max(0, amount - fee);

  return (
    <>
      <div className="bg-[#F7F7F7] border border-[#E6E6E6] rounded-[10px] p-4 mb-4">
        <div className="flex justify-between text-[13px] py-1.5 border-b border-[#F7F7F7]">
          <span className="text-[#808080]">Withdrawal amount</span>
          <span className="font-semibold text-[#1A1A1A]">{formatUsd(amount)}</span>
        </div>
        <div className="flex justify-between text-[13px] py-1.5 border-b border-[#F7F7F7]">
          <span className="text-[#808080]">Method</span>
          <span className="font-semibold text-[#1A1A1A]">{WITHDRAW_METHOD_LABELS[method]}</span>
        </div>
        <div className="flex justify-between text-[13px] py-1.5 border-b border-[#F7F7F7]">
          <span className="text-[#808080]">Processing fee</span>
          <span className="font-semibold text-[#1A1A1A]">{formatWithdrawFee(amount, method)}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold pt-2">
          <span className="text-[#1A1A1A]">You will receive</span>
          <span className="text-[#1D871D] text-base">{formatUsd(net)}</span>
        </div>
      </div>

      <AlertBanner variant="blue" className="!text-xs mb-4">
        Withdrawals cannot be cancelled once submitted. Ensure account details are correct before
        confirming.
      </AlertBanner>

      <Button variant="primary" pill={false} className="!rounded-lg gap-2 !py-3" onClick={onConfirm}>
        <CheckIcon size={15} strokeWidth={2.5} />
        Confirm Withdrawal
      </Button>
    </>
  );
};

export default WithdrawStepConfirm;
