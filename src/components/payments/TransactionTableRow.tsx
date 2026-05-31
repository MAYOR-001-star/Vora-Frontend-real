import React from 'react';
import Tag from '../common/Tag';
import TransactionTypeIcon from './TransactionTypeIcon';
import type { TransactionListItem } from '../../types/transactionsList';
import {
  formatTransactionAmount,
  transactionAmountClass,
  transactionTypeToIcon,
} from '../../utils/transactionsList';
import { paymentStatusToTagVariant } from '../../utils/paymentStatusTag';

interface TransactionTableRowProps {
  item: TransactionListItem;
  onClick: () => void;
}

const TransactionTableRow: React.FC<TransactionTableRowProps> = ({ item, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full grid grid-cols-[40px_minmax(0,1fr)_140px_100px_110px_90px] max-md:grid-cols-[40px_minmax(0,1fr)_90px_70px] items-center px-[18px] py-3 border-b border-[#F7F7F7] last:border-0 hover:bg-[#FAFAFA] transition-colors text-left cursor-pointer"
  >
    <TransactionTypeIcon variant={transactionTypeToIcon(item.type)} size="sm" />
    <div className="min-w-0 pr-3">
      <p className="text-[13px] font-medium text-[#1A1A1A] truncate mb-0.5">{item.title}</p>
      <p className="text-[11px] text-[#808080] truncate">{item.sub}</p>
    </div>
    <span className="hidden md:block text-xs text-[#808080]">{item.date}</span>
    <span className="hidden md:block text-[11px] font-semibold text-[#ADADAD]">#{item.id}</span>
    <span className={`text-right text-[13px] font-semibold ${transactionAmountClass(item)}`}>
      {formatTransactionAmount(item)}
    </span>
    <span className="flex justify-center max-md:justify-end">
      <Tag
        label={item.statusLabel}
        variant={paymentStatusToTagVariant(item.status)}
        className="!text-[10px] !py-0.5 !px-2"
      />
    </span>
  </button>
);

export default TransactionTableRow;
