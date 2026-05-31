import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import { PageTitle, SectionDescription } from '../../components/common/Typography';
import TransactionFiltersBar from '../../components/payments/TransactionFiltersBar';
import TransactionsTable from '../../components/payments/TransactionsTable';
import TransactionReceiptModal from '../../components/payments/TransactionReceiptModal';
import { ALL_TRANSACTIONS } from '../../constants/transactionsList';
import { filterTransactions } from '../../utils/transactionsList';
import type { TransactionListItem } from '../../types/transactionsList';

const PaymentsTransactions: React.FC = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<TransactionListItem | null>(null);

  const filtered = useMemo(
    () => filterTransactions(ALL_TRANSACTIONS, search, type, status),
    [search, type, status],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    setPage(0);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(0);
  };

  return (
    <div className="w-full pb-10 animate-in fade-in duration-500">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
        <div>
          <PageTitle className="text-2xl tracking-tight">All Transactions</PageTitle>
          <SectionDescription className="text-[13px] mt-1 max-w-3xl">
            Full audit trail — top-ups, escrow locks, true-ups, alignment fees, refunds, withdrawals ·
            Click any row for full receipt
          </SectionDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/payments">
            <Button variant="outline" fullWidth={false} size="sm" pill={false} className="!text-xs font-semibold">
              Wallet
            </Button>
          </Link>
          <Button
            variant="outline"
            fullWidth={false}
            size="sm"
            pill={false}
            className="!text-xs font-semibold gap-1.5"
            onClick={() => toast.success('CSV exported')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </Button>
        </div>
      </div>

      <TransactionFiltersBar
        search={search}
        type={type}
        status={status}
        onSearchChange={handleSearchChange}
        onTypeChange={handleTypeChange}
        onStatusChange={handleStatusChange}
      />

      <TransactionsTable
        items={filtered}
        page={page}
        onPageChange={(delta) => setPage((p) => Math.max(0, p + delta))}
        onRowClick={setSelected}
      />

      <TransactionReceiptModal
        open={selected != null}
        item={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
};

export default PaymentsTransactions;
