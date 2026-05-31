import { WALLET_CURRENT_BALANCE } from './topUpWallet';
import type { WithdrawMethodOption, TimelineStep } from '../types/withdrawWallet';

export const MIN_WITHDRAW_AMOUNT = 50;

export const WITHDRAW_AMOUNT_PRESETS = [100, 500, 1000, WALLET_CURRENT_BALANCE];

export const WITHDRAW_METHODS: WithdrawMethodOption[] = [
  {
    id: 'bank',
    name: 'Bank Transfer',
    subtitle: 'Direct to any bank worldwide · 1–3 business days · No fee',
  },
  {
    id: 'stripe',
    name: 'Card / Stripe Payout',
    subtitle: 'To your saved Stripe account · Next business day · 0.25% fee',
  },
];

export const WITHDRAW_BANK_COUNTRIES = [
  'Nigeria',
  'Kenya',
  'Ghana',
  'South Africa',
  'United Kingdom',
  'United States',
  'Germany',
];

export const STRIPE_PAYOUT_CURRENCIES = ['USD', 'EUR', 'GBP', 'NGN', 'KES', 'GHS'];

export const WITHDRAW_PROCESSING_TIMELINE: TimelineStep[] = [
  {
    title: 'Request submitted',
    meta: 'Immediately upon confirmation',
    status: 'done',
  },
  {
    title: 'VORA processes payout',
    meta: 'Within 1 business day',
    status: 'active',
  },
  {
    title: 'Funds arrive',
    meta: '1–3 business days (bank) · Next business day (Stripe)',
    status: 'pending',
  },
];

export const WITHDRAW_METHOD_LABELS: Record<string, string> = {
  bank: 'Bank Transfer',
  stripe: 'Stripe Payout',
};
