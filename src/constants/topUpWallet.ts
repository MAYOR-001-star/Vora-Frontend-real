import type { BankAccountDetailRow, TopUpMethodTab, WalletSnapshotRow } from '../types/topUpWallet';

export const TOP_UP_METHOD_TABS: TopUpMethodTab[] = [
  { id: 'stripe', label: 'Stripe (Card)' },
  { id: 'paystack', label: 'Paystack' },
  { id: 'flutterwave', label: 'Flutterwave' },
  { id: 'bank', label: 'Bank Transfer' },
];

export const TOP_UP_AMOUNT_PRESETS = [100, 250, 500, 1000, 2500];
export const TOP_UP_AMOUNT_PRESETS_SHORT = [100, 250, 500, 1000];
export const TOP_UP_PRESET_VALUES = new Set(TOP_UP_AMOUNT_PRESETS);

export const WALLET_CURRENT_BALANCE = 3240;

export const WALLET_SNAPSHOT_ROWS: WalletSnapshotRow[] = [
  { label: 'Available balance', value: '$3,240.00' },
  { label: 'In escrow (3 roles)', value: '$2,550.00', valueClassName: 'text-[#0047CC]' },
  { label: 'Alignment fees held', value: '$300.00', valueClassName: 'text-[#D97706]' },
  { label: 'True-up owed', value: '$750.00', valueClassName: 'text-[#DC2626]' },
];

export const BANK_ACCOUNT_DETAILS: BankAccountDetailRow[] = [
  { label: 'Account Name', value: 'VORA Global Health Ltd' },
  { label: 'Account Number', value: '0123 4567 89' },
  { label: 'Sort Code / SWIFT', value: '20-15-47 / VORAGB2L' },
  { label: 'Bank', value: 'Barclays UK' },
  { label: 'Reference', value: 'VORA-EN-20250001', highlight: true },
];

export const STRIPE_BILLING_COUNTRIES = [
  'Nigeria',
  'Kenya',
  'Ghana',
  'South Africa',
  'United Kingdom',
  'United States',
  'Germany',
  'India',
  'Canada',
  'Australia',
];

export const PAYSTACK_COUNTRIES = [
  'Nigeria (NGN)',
  'Ghana (GHS)',
  'Kenya (KES)',
  "Côte d'Ivoire (XOF)",
  'Rwanda (RWF)',
  'South Africa (ZAR)',
];

export const PAYSTACK_DIAL_CODES = ['+234 (NG)', '+233 (GH)', '+254 (KE)', '+225 (CI)', '+250 (RW)', '+27 (ZA)'];

export const PAYSTACK_CHANNELS = [
  'Card (Visa / Mastercard / Verve)',
  'Bank Transfer',
  'USSD',
  'MTN Mobile Money',
  'M-Pesa (Kenya)',
  'Airtel Money',
  "Wave (Côte d'Ivoire)",
  'QR Code',
];

export const FLUTTERWAVE_COUNTRY_GROUPS = [
  {
    label: 'East Africa',
    options: [
      { value: 'KE', label: 'Kenya (KES)' },
      { value: 'UG', label: 'Uganda (UGX)' },
      { value: 'TZ', label: 'Tanzania (TZS)' },
      { value: 'RW', label: 'Rwanda (RWF)' },
      { value: 'ZM', label: 'Zambia (ZMW)' },
      { value: 'ET', label: 'Ethiopia (ETB)' },
    ],
  },
  {
    label: 'West Africa',
    options: [
      { value: 'NG', label: 'Nigeria (NGN)' },
      { value: 'GH', label: 'Ghana (GHS)' },
      { value: 'SN', label: 'Senegal (XOF)' },
      { value: 'CM', label: 'Cameroon (XAF)' },
      { value: 'CI', label: "Côte d'Ivoire (XOF)" },
    ],
  },
  {
    label: 'Southern Africa',
    options: [{ value: 'ZA', label: 'South Africa (ZAR)' }],
  },
];

export const FLUTTERWAVE_DIAL_CODES = [
  '+254 (KE)',
  '+256 (UG)',
  '+255 (TZ)',
  '+250 (RW)',
  '+260 (ZM)',
  '+234 (NG)',
  '+233 (GH)',
  '+221 (SN)',
  '+237 (CM)',
  '+225 (CI)',
  '+27 (ZA)',
];

export const FLUTTERWAVE_CHANNELS_BY_COUNTRY: Record<string, string[]> = {
  KE: ['M-Pesa (Kenya)', 'Card (Visa / Mastercard)', 'Bank Transfer'],
  UG: ['Mobile Money Uganda', 'Airtel Money', 'Card (Visa / Mastercard)', 'Bank Transfer'],
  TZ: ['Mobile Money Tanzania', 'Airtel Money', 'Card (Visa / Mastercard)', 'Bank Transfer'],
  RW: ['Mobile Money Rwanda', 'MTN Mobile Money', 'Card (Visa / Mastercard)', 'Bank Transfer'],
  ZM: ['Airtel Money', 'Card (Visa / Mastercard)', 'Bank Transfer'],
  NG: ['Card (Visa / Mastercard)', 'Bank Transfer', 'MTN Mobile Money'],
  GH: ['MTN Mobile Money', 'Card (Visa / Mastercard)', 'Bank Transfer'],
  SN: ["Wave (Senegal / Côte d'Ivoire)", 'Card (Visa / Mastercard)', 'Bank Transfer'],
  CM: ['MTN Mobile Money', 'Card (Visa / Mastercard)', 'Bank Transfer'],
  CI: ["Wave (Senegal / Côte d'Ivoire)", 'Orange Money', 'Card (Visa / Mastercard)', 'Bank Transfer'],
  ZA: ['Card (Visa / Mastercard)', 'Bank Transfer'],
  ET: ['Card (Visa / Mastercard)', 'Bank Transfer'],
};

export const FLUTTERWAVE_DEFAULT_CHANNELS = [
  'M-Pesa (Kenya)',
  'MTN Mobile Money',
  'Airtel Money',
  'Card (Visa / Mastercard)',
  'Bank Transfer',
  'Mobile Money Uganda',
  'Mobile Money Tanzania',
  'Mobile Money Rwanda',
  "Wave (Senegal / Côte d'Ivoire)",
];

export const PROCESSOR_LABELS: Record<string, string> = {
  stripe: 'Stripe',
  paystack: 'Paystack',
  flutterwave: 'Flutterwave',
  bank: 'Bank Transfer',
};
