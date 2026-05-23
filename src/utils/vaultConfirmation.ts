import type { VaultConfirmationData } from '../types/vault';
import { VAULT_CONFIRMATION_STORAGE_KEY } from '../constants/vaultConfirmation';

export interface VaultConfirmationInput {
  roleTitle?: string;
  goLiveDate?: string;
  positions?: string;
  salaryMidpoint?: number;
  currency?: string;
  feeRateLabel?: string;
  feePerPosition?: number;
  totalEscrow?: number;
  isLmic?: boolean;
}

const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return '--';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const formatToday = (): string => formatDisplayDate(new Date().toISOString().slice(0, 10));

const addDays = (dateStr: string, days: number): string => {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

const daysBetween = (from: string, to: string): number => {
  const start = new Date(from);
  const end = new Date(to);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
  return Math.max(0, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
};

const fmtMoney = (amount: number, currency = 'USD'): string =>
  `${currency} ${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

export const buildVaultConfirmationData = (input: VaultConfirmationInput = {}): VaultConfirmationData => {
  const today = new Date().toISOString().slice(0, 10);
  const goLiveDate = input.goLiveDate || '2025-09-01';
  const goLiveFormatted = formatDisplayDate(goLiveDate);
  const submittedDateFormatted = formatToday();
  const reminderDate = formatDisplayDate(addDays(goLiveDate, -3));
  const vaultPeriodEnd = formatDisplayDate(addDays(goLiveDate, -3));

  const positions = parseInt(input.positions || '3', 10) || 3;
  const currency = input.currency || 'USD';
  const midpoint = input.salaryMidpoint ?? 70000;
  const isLmic = input.isLmic ?? false;
  const rate = isLmic ? 0.1 : 0.15;
  const feePerPosition = input.feePerPosition ?? Math.round(midpoint * rate);
  const totalEscrow = input.totalEscrow ?? feePerPosition * positions;
  const feeRateLabel = input.feeRateLabel ?? (isLmic ? '10% (LMIC currency)' : '15% (10% if LMIC currency)');

  const vaultReference = `VLT-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`;

  return {
    vaultReference,
    roleTitle: input.roleTitle || 'Global Health Research Intern',
    goLiveDate,
    goLiveDateFormatted: goLiveFormatted,
    submittedDateFormatted,
    reminderDateFormatted: reminderDate,
    vaultPeriodEndFormatted: vaultPeriodEnd,
    preQualifiedCount: 0,
    daysUntilGoLive: daysBetween(today, goLiveDate),
    escrowRows: [
      { label: 'Salary midpoint used for escrow', value: fmtMoney(midpoint, currency) },
      { label: 'Positions', value: String(positions) },
      { label: 'Fee rate locked today', value: feeRateLabel },
      { label: 'Fee per position', value: fmtMoney(feePerPosition, currency) },
      { label: 'Total escrow locked', value: fmtMoney(totalEscrow, currency), highlight: true },
      {
        label: 'Non-refundable search fee if no hire occurs',
        value: isLmic ? '5% of escrow (LMIC) / 10% (other regions)' : '5% of escrow (LMIC) / 10% (other regions)',
      },
      {
        label: 'Full refund if cancelled before 24hrs of go-live',
        value: `${fmtMoney(totalEscrow, currency)} → your wallet`,
        highlight: true,
      },
    ],
  };
};

export const saveVaultConfirmation = (data: VaultConfirmationData): void => {
  sessionStorage.setItem(VAULT_CONFIRMATION_STORAGE_KEY, JSON.stringify(data));
};

export const loadVaultConfirmation = (): VaultConfirmationData | null => {
  try {
    const raw = sessionStorage.getItem(VAULT_CONFIRMATION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as VaultConfirmationData;
  } catch {
    return null;
  }
};
