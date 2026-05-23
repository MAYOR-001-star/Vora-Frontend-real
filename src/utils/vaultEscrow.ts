import type { EscrowRecalcResult } from '../types/vaultEdit';

export const formatUsd = (amount: number): string =>
  `USD ${Math.abs(amount).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

export const calcEscrowRecalc = (
  salMin: number,
  salMax: number,
  positions: number,
  originalEscrow: number,
  feeRate = 0.15
): EscrowRecalcResult => {
  const mid = salMin && salMax ? (salMin + salMax) / 2 : salMin || salMax;
  const newEscrow = mid * positions * feeRate;
  return {
    originalMidpoint: 70000,
    newMidpoint: mid,
    positions,
    originalEscrow,
    newEscrow,
    adjustment: newEscrow - originalEscrow,
  };
};
