import React from 'react';
import PaymentCard from './PaymentCard';
import type { WalletSnapshotRow } from '../../types/topUpWallet';
import { formatUsd } from '../../utils/topUpWallet';

interface WalletSnapshotCardProps {
  rows: WalletSnapshotRow[];
  afterTopUp: number;
}

const WalletSnapshotCard: React.FC<WalletSnapshotCardProps> = ({ rows, afterTopUp }) => (
  <PaymentCard title="Current Wallet" bodyClassName="px-5 py-4">
    {rows.map((row) => (
      <div
        key={row.label}
        className="flex justify-between text-[13px] py-1.5 border-b border-[#F7F7F7] last:border-0"
      >
        <span className="text-[#808080]">{row.label}</span>
        <span className={`font-semibold ${row.valueClassName ?? 'text-[#1A1A1A]'}`}>{row.value}</span>
      </div>
    ))}
    <div className="flex justify-between text-[13px] py-1.5">
      <span className="text-[#808080]">After top-up</span>
      <span className="font-semibold text-[#1D871D]">{formatUsd(afterTopUp)}</span>
    </div>
  </PaymentCard>
);

export default WalletSnapshotCard;
