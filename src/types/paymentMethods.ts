import type { TopUpPaymentMethod } from './topUpWallet';

export type SavedMethodType = 'stripe' | 'paystack' | 'flutterwave' | 'bank';

export type SavedMethodBadgeVariant = 'default' | 'active' | 'manual';

export interface SavedPaymentMethod {
  id: string;
  type: SavedMethodType;
  name: string;
  detail: string;
  badge: { label: string; variant: SavedMethodBadgeVariant };
  isDefault: boolean;
  removed?: boolean;
}

export interface SupportedGateway {
  id: string;
  title: string;
  description: string;
  regions: string;
  iconBg: string;
  iconStroke: string;
}

export interface LocationRoutingRow {
  region: string;
  gateway: string;
  gatewayColor?: string;
  secondaryGateway?: string;
}

export interface LocationRoutingSection {
  label: string;
  rows: LocationRoutingRow[];
}

export type AddPaymentMethodTab = TopUpPaymentMethod;
