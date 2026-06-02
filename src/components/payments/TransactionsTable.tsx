import React from 'react';
import PaginationControls from '../common/PaginationControls';
import TransactionTableRow from './TransactionTableRow';
import type { TransactionListItem } from '../../types/transactionsList';
import { TRANSACTIONS_PER_PAGE } from '../../constants/transactionsList';

interface TransactionsTableProps {
  items: TransactionListItem[];
  page: number;
  onPageChange: (delta: number) => void;
  onRowClick: (item: TransactionListItem) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  items,
  page,
  onPageChange,
  onRowClick,
}) => {
  const start = page * TRANSACTIONS_PER_PAGE;
  const slice = items.slice(start, start + TRANSACTIONS_PER_PAGE);
  return (
    <div className="bg-white border border-[#E6E6E6] rounded-xl overflow-hidden">
      <div className="grid grid-cols-[40px_minmax(0,1fr)_140px_100px_110px_90px] max-md:grid-cols-[40px_minmax(0,1fr)_90px_70px] px-[18px] py-2.5 bg-[#F7F7F7] border-b border-[#E6E6E6]">
        <span />
        <span className="text-[10px] font-semibold text-[#808080] uppercase tracking-wide">
          Description
        </span>
        <span className="hidden md:block text-[10px] font-semibold text-[#808080] uppercase tracking-wide">
          Date
        </span>
        <span className="hidden md:block text-[10px] font-semibold text-[#808080] uppercase tracking-wide">
          Reference
        </span>
        <span className="text-[10px] font-semibold text-[#808080] uppercase tracking-wide text-right">
          Amount
        </span>
        <span className="text-[10px] font-semibold text-[#808080] uppercase tracking-wide text-center max-md:text-right">
          Status
        </span>
      </div>

      {slice.length === 0 ? (
        <p className="py-10 text-center text-[13px] text-[#ADADAD]">No transactions match your filters.</p>
      ) : (
        slice.map((item) => (
          <TransactionTableRow key={item.id} item={item} onClick={() => onRowClick(item)} />
        ))
      )}

      <div className="px-[18px] py-3 border-t border-[#E6E6E6] flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-[#808080]">
          {items.length === 0
            ? 'No results'
            : `Showing ${start + 1},${Math.min(start + TRANSACTIONS_PER_PAGE, items.length)} of ${items.length}`}
        </span>
        <PaginationControls
          currentPage={page}
          disablePrev={page === 0}
          disableNext={start + TRANSACTIONS_PER_PAGE >= items.length}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default TransactionsTable;
