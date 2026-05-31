import type { TransactionListItem, TransactionListType } from '../types/transactionsList';
import type { TransactionIconVariant } from '../types/paymentsOverview';

const TYPE_TO_ICON: Record<TransactionListType, TransactionIconVariant> = {
  top_up: 'topup',
  escrow: 'escrow',
  trueup_charge: 'trueup',
  trueup_credit: 'trueup-credit',
  alignment: 'align',
  refund: 'refund',
  withdrawal: 'withdraw',
};

export function transactionTypeToIcon(type: TransactionListType): TransactionIconVariant {
  return TYPE_TO_ICON[type];
}

export function formatTransactionAmount(item: TransactionListItem): string {
  if (item.sign === '$') return `$${item.amount.toFixed(2)} owed`;
  const prefix = item.sign === '+' ? '+' : '−';
  return `${prefix}$${item.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function transactionAmountClass(item: TransactionListItem): string {
  if (item.sign === '+') return 'text-[#1D871D]';
  if (item.sign === '$') return 'text-[#D97706]';
  return 'text-[#1A1A1A]';
}

export function filterTransactions(
  items: TransactionListItem[],
  query: string,
  type: string,
  status: string,
): TransactionListItem[] {
  const q = query.trim().toLowerCase();
  return items.filter((item) => {
    if (
      q &&
      !item.title.toLowerCase().includes(q) &&
      !item.id.toLowerCase().includes(q) &&
      !item.sub.toLowerCase().includes(q)
    ) {
      return false;
    }
    if (type && item.type !== type) return false;
    if (status && item.status !== status) return false;
    return true;
  });
}

export function formatTransactionTypeLabel(type: TransactionListType): string {
  return type
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
