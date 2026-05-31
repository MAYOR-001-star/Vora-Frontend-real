import type { PaymentStatusBadgeVariant, WalletTileAccent } from '../types/paymentsOverview';
import type { ComponentProps } from 'react';
import type Tag from '../components/common/Tag';

export type PaymentTagVariant = NonNullable<ComponentProps<typeof Tag>['variant']>;

/** Text color classes aligned with `Tag` variant styles. */
export const PAYMENT_STATUS_AMOUNT_CLASS: Record<PaymentStatusBadgeVariant, string> = {
  completed: 'text-[#2CA62C]',
  pending: 'text-[#D97706]',
  held: 'text-[#0047CC]',
  refunded: 'text-gray-600',
  failed: 'text-[#DC2626]',
  hired: 'text-[#2CA62C]',
  flagged: 'text-[#DC2626]',
};

const STATUS_TAG_VARIANT: Record<PaymentStatusBadgeVariant, PaymentTagVariant> = {
  completed: 'green',
  pending: 'yellow',
  held: 'blue',
  refunded: 'gray',
  failed: 'red',
  hired: 'green',
  flagged: 'red',
};

const WALLET_BADGE_VARIANT: Record<WalletTileAccent, PaymentTagVariant> = {
  blue: 'blue',
  green: 'green',
  orange: 'yellow',
  purple: 'purple',
};

export function paymentStatusToTagVariant(status: PaymentStatusBadgeVariant): PaymentTagVariant {
  return STATUS_TAG_VARIANT[status];
}

export function paymentStatusAmountClass(status: PaymentStatusBadgeVariant): string {
  return PAYMENT_STATUS_AMOUNT_CLASS[status];
}

export function walletBadgeToTagVariant(accent: WalletTileAccent): PaymentTagVariant {
  return WALLET_BADGE_VARIANT[accent];
}
