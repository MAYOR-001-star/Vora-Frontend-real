export type PaymentStatusBadgeVariant =
  | 'completed'
  | 'pending'
  | 'held'
  | 'refunded'
  | 'failed'
  | 'hired'
  | 'flagged';

export type WalletTileAccent = 'blue' | 'green' | 'orange' | 'purple';

export type TransactionIconVariant =
  | 'topup'
  | 'fee'
  | 'escrow'
  | 'refund'
  | 'align'
  | 'trueup'
  | 'trueup-credit'
  | 'withdraw';

export interface WalletTileData {
  id: string;
  label: string;
  amount: string;
  sub: string;
  badge: string;
  accent: WalletTileAccent;
  badgeVariant: WalletTileAccent;
}

export interface TransactionItem {
  id: string;
  icon: TransactionIconVariant;
  name: string;
  date: string;
  amount: string;
  amountTone?: 'positive' | 'negative' | 'warning';
  status: PaymentStatusBadgeVariant;
  statusLabel: string;
}

export interface EscrowPositionItem {
  id: string;
  job: string;
  meta: string;
  amount: string;
  amountColor?: string;
  dotColor?: string;
}

export interface SpendCompositionItem {
  label: string;
  value: string;
  percent: number;
  barColor: string;
}

export interface RateInfoRow {
  key: string;
  value: string;
}

export interface EscrowDetailData {
  title: string;
  ref: string;
  rows: { label: string; value: string }[];
  trueupNote: string;
}
