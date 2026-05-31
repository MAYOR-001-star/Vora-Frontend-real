import React from 'react';
import Button from '../common/Button';

interface BalancePanelProps {
  amount: string;
  subtitle: string;
  onTopUp?: () => void;
  onWithdraw?: () => void;
}

const BalancePanel: React.FC<BalancePanelProps> = ({
  amount,
  subtitle,
  onTopUp,
  onWithdraw,
}) => (
  <div className="bg-white border border-[#E6E6E6] rounded-xl mb-3.5 px-5 py-6 text-center">
    <p className="text-[11px] font-semibold text-[#808080] uppercase tracking-wide mb-2">
      Available Balance
    </p>
    <p className="text-[40px] font-bold text-[#1A1A1A] tracking-tight leading-none mb-1">
      {amount}
    </p>
    <p className="text-xs text-[#808080] mb-5">{subtitle}</p>
    <div className="flex gap-2">
      <Button variant="primary" fullWidth size="sm" className="font-semibold" onClick={onTopUp}>
        Top Up
      </Button>
      <Button variant="outline" fullWidth size="sm" className="font-semibold border-[#E6E6E6]" onClick={onWithdraw}>
        Withdraw
      </Button>
    </div>
  </div>
);

export default BalancePanel;
