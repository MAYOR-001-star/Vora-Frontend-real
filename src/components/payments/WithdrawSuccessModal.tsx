import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { CheckIcon } from '../common/Icons';
import { formatUsd } from '../../utils/topUpWallet';

interface WithdrawSuccessModalProps {
  open: boolean;
  amount: number;
  onClose: () => void;
}

const WithdrawSuccessModal: React.FC<WithdrawSuccessModalProps> = ({ open, amount, onClose }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-[14px] w-full max-w-[420px] p-8 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="w-[60px] h-[60px] rounded-full bg-[#EEFBEE] border-2 border-[#2CA62C] flex items-center justify-center mx-auto mb-4">
          <CheckIcon size={28} className="text-[#2CA62C]" strokeWidth={2.5} />
        </div>
        <h2 className="text-xl font-bold text-[#1A1A1A] mb-1.5">Withdrawal Initiated!</h2>
        <p className="text-sm text-[#808080] mb-1.5">{formatUsd(amount)} withdrawal submitted</p>
        <p className="text-xs text-[#ADADAD] mb-6">
          Reference: #WD-2025-0042 · Funds arrive within 1,3 business days
        </p>
        <div className="flex flex-wrap gap-2.5 justify-center">
          <Button variant="outline" fullWidth={false} size="sm" pill={false} onClick={onClose}>
            View Transactions
          </Button>
          <Link to="/payments">
            <Button variant="primary" fullWidth={false} size="sm" pill={false}>
              Back to Wallet
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WithdrawSuccessModal;
