import { validateEmail } from './validation';

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

export function required(value: string, message = 'This field is required'): string {
  return value.trim() ? '' : message;
}

export function validateCardholderName(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return 'Cardholder name is required';
  if (trimmed.length < 2) return 'Enter the full name on your card';
  return '';
}

export function validateCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (!digits) return 'Card number is required';
  if (digits.length < 13 || digits.length > 19) return 'Enter a valid card number';
  return '';
}

export function validateCardExpiry(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (!digits) return 'Expiry date is required';
  if (digits.length < 4) return 'Enter expiry as MM / YY';

  const month = parseInt(digits.substring(0, 2), 10);
  const year = parseInt(digits.substring(2, 4), 10);
  if (month < 1 || month > 12) return 'Enter a valid month';

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return 'Card has expired';
  }
  return '';
}

export function validateCvc(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (!digits) return 'CVC is required';
  if (digits.length < 3 || digits.length > 4) return 'Enter a valid CVC';
  return '';
}

export function validatePhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (!digits) return 'Phone number is required';
  if (digits.length < 7 || digits.length > 15) return 'Enter a valid phone number';
  return '';
}

export function validateAccountHolderName(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return 'Account holder name is required';
  if (trimmed.length < 2) return 'Enter the full name on the account';
  return '';
}

export function validateBankName(value: string): string {
  return required(value, 'Bank name is required');
}

export function validateAccountNumber(value: string): string {
  const trimmed = value.replace(/\s/g, '');
  if (!trimmed) return 'Account number or IBAN is required';
  if (trimmed.length < 6) return 'Enter a valid account number or IBAN';
  return '';
}

export function validateSwiftBic(value: string, optional = false): string {
  const trimmed = value.trim().toUpperCase();
  if (!trimmed) return optional ? '' : 'SWIFT / BIC is required';
  if (!/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(trimmed)) {
    return 'Enter a valid SWIFT / BIC code';
  }
  return '';
}

export function validateSortCode(value: string, optional = false): string {
  const trimmed = value.trim();
  if (!trimmed) return optional ? '' : 'Sort code / routing number is required';
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 6) return 'Enter a valid sort or routing code';
  return '';
}

export function validateCountrySelection(value: string): string {
  return required(value, 'Please select a country');
}

export function validateChannelSelection(value: string): string {
  return required(value, 'Please select a channel');
}

export interface StripeCardFormValues {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  country: string;
}

export function validateStripeCardForm(values: StripeCardFormValues): FieldErrors<keyof StripeCardFormValues> {
  return {
    cardholderName: validateCardholderName(values.cardholderName),
    cardNumber: validateCardNumber(values.cardNumber),
    expiry: validateCardExpiry(values.expiry),
    cvc: validateCvc(values.cvc),
    country: validateCountrySelection(values.country),
  };
}

export interface GatewayMethodFormValues {
  country: string;
  email: string;
  phone: string;
  channel: string;
}

export function validateGatewayMethodForm(values: GatewayMethodFormValues): FieldErrors<keyof GatewayMethodFormValues> {
  return {
    country: validateCountrySelection(values.country),
    email: validateEmail(values.email),
    phone: validatePhoneNumber(values.phone),
    channel: validateChannelSelection(values.channel),
  };
}

export interface BankMethodFormValues {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  sortCode: string;
  swiftBic: string;
  country: string;
}

export function validateBankMethodForm(values: BankMethodFormValues): FieldErrors<keyof BankMethodFormValues> {
  return {
    accountHolderName: validateAccountHolderName(values.accountHolderName),
    bankName: validateBankName(values.bankName),
    accountNumber: validateAccountNumber(values.accountNumber),
    sortCode: validateSortCode(values.sortCode, true),
    swiftBic: validateSwiftBic(values.swiftBic, true),
    country: validateCountrySelection(values.country),
  };
}

export interface WithdrawStripeAccountValues {
  stripeEmail: string;
  payoutCurrency: string;
}

export function validateWithdrawStripeAccount(
  values: WithdrawStripeAccountValues,
): FieldErrors<keyof WithdrawStripeAccountValues> {
  return {
    stripeEmail: validateEmail(values.stripeEmail),
    payoutCurrency: required(values.payoutCurrency, 'Please select a payout currency'),
  };
}

export interface WithdrawBankAccountValues {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  sortCode: string;
  swiftBic: string;
  country: string;
}

export function validateWithdrawBankAccount(
  values: WithdrawBankAccountValues,
): FieldErrors<keyof WithdrawBankAccountValues> {
  return {
    accountHolderName: validateAccountHolderName(values.accountHolderName),
    bankName: validateBankName(values.bankName),
    accountNumber: validateAccountNumber(values.accountNumber),
    sortCode: validateSortCode(values.sortCode, true),
    swiftBic: validateSwiftBic(values.swiftBic, true),
    country: validateCountrySelection(values.country),
  };
}

export function hasFieldErrors<T extends string>(errors: FieldErrors<T>): boolean {
  return Object.values(errors).some((message) => Boolean(message));
}

export function touchAllFields<T extends string>(fields: T[]): Record<T, boolean> {
  return fields.reduce(
    (acc, field) => {
      acc[field] = true;
      return acc;
    },
    {} as Record<T, boolean>,
  );
}
