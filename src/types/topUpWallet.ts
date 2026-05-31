export type TopUpPaymentMethod = 'stripe' | 'paystack' | 'flutterwave' | 'bank';

export interface TopUpMethodTab {
  id: TopUpPaymentMethod;
  label: string;
}

export interface WalletSnapshotRow {
  label: string;
  value: string;
  valueClassName?: string;
}

export interface BankAccountDetailRow {
  label: string;
  value: string;
  highlight?: boolean;
}
