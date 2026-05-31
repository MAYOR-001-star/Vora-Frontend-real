import type { PaymentStatusBadgeVariant, TransactionIconVariant } from './paymentsOverview';

export type TransactionListType =
  | 'top_up'
  | 'escrow'
  | 'trueup_charge'
  | 'trueup_credit'
  | 'alignment'
  | 'refund'
  | 'withdrawal';

export type TransactionAmountSign = '+' | '-' | '$';

export interface TransactionListItem {
  id: string;
  type: TransactionListType;
  status: PaymentStatusBadgeVariant;
  statusLabel: string;
  title: string;
  sub: string;
  date: string;
  amount: number;
  sign: TransactionAmountSign;
  job?: string;
  detail?: Record<string, string>;
}

export type TransactionListIcon = TransactionIconVariant;
