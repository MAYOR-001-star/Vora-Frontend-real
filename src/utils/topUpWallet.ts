export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function calculateCardProcessingFee(amount: number): number {
  if (amount <= 0) return 0;
  return Math.round((amount * 0.014 + 0.3) * 100) / 100;
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').substring(0, 16);
  return digits.replace(/(\d{4})/g, '$1 ').trim();
}

export function formatCardExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').substring(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.substring(0, 2)} / ${digits.substring(2)}`;
}
