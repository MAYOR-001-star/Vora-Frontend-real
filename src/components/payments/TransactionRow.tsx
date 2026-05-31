import React from 'react';
import Tag from '../common/Tag';
import TransactionTypeIcon from './TransactionTypeIcon';
import type { TransactionItem } from '../../types/paymentsOverview';
import {
  paymentStatusAmountClass,
  paymentStatusToTagVariant,
} from '../../utils/paymentStatusTag';

interface TransactionRowProps extends TransactionItem {
  onClick?: () => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({
  icon,
  name,
  date,
  amount,
  status,
  statusLabel,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center gap-3 px-5 py-3 border-b border-[#F7F7F7] last:border-0 hover:bg-[#FAFAFA] transition-colors text-left cursor-pointer"
  >
    <TransactionTypeIcon variant={icon} />
    <div className="flex-1 min-w-0">
      <p className="text-[13px] font-medium text-[#1A1A1A] truncate mb-0.5">{name}</p>
      <p className="text-[11px] text-[#808080]">{date}</p>
    </div>
    <div className="shrink-0 text-right">
      <p className={`text-[13px] font-semibold ${paymentStatusAmountClass(status)}`}>{amount}</p>
      <div className="mt-1 flex justify-end">
        <Tag
          label={statusLabel}
          variant={paymentStatusToTagVariant(status)}
          className="!text-[10px] !py-0.5 !px-2"
        />
      </div>
    </div>
  </button>
);

export default TransactionRow;
