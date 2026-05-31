import React from 'react';
import Tag from '../common/Tag';
import type { WalletTileData } from '../../types/paymentsOverview';
import { walletBadgeToTagVariant } from '../../utils/paymentStatusTag';

interface WalletTileProps extends WalletTileData {
  onClick?: () => void;
}

const WalletTile: React.FC<WalletTileProps> = ({
  label,
  amount,
  sub,
  badge,
  badgeVariant,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="text-left bg-white border border-[#E6E6E6] rounded-xl p-5 transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] cursor-pointer w-full"
  >
    <p className="text-[11px] font-semibold text-[#808080] uppercase tracking-wide mb-2">{label}</p>
    <p className="text-[26px] font-bold text-[#1A1A1A] tracking-tight leading-none mb-1">
      {amount}
    </p>
    <p className="text-xs text-[#808080] leading-snug">{sub}</p>
    <Tag
      label={badge}
      variant={walletBadgeToTagVariant(badgeVariant)}
      className="mt-2 !text-[10px] !py-0.5 !px-2"
    />
  </button>
);

export default WalletTile;
