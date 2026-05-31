import type { WithdrawMethod } from '../types/withdrawWallet';

export function calculateWithdrawFee(amount: number, method: WithdrawMethod): number {
  if (amount <= 0 || method !== 'stripe') return 0;
  return Math.round(amount * 0.0025 * 100) / 100;
}

export function formatWithdrawFee(amount: number, method: WithdrawMethod): string {
  const fee = calculateWithdrawFee(amount, method);
  return fee > 0 ? `$${fee.toFixed(2)}` : 'Free';
}
