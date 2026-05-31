import type {
  LocationRoutingSection,
  SavedPaymentMethod,
  SupportedGateway,
} from '../types/paymentMethods';

export const INITIAL_SAVED_PAYMENT_METHODS: SavedPaymentMethod[] = [
  {
    id: 'pm1',
    type: 'stripe',
    name: 'Mastercard •••• 4242',
    detail: 'Eric Nelson · Expires 08/27 · Stripe',
    badge: { label: 'Active', variant: 'active' },
    isDefault: true,
  },
  {
    id: 'pm2',
    type: 'paystack',
    name: 'Paystack – GTBank Nigeria',
    detail: 'payments@globalhealth.org · Nigeria (NGN) · West Africa',
    badge: { label: 'Active', variant: 'active' },
    isDefault: false,
  },
  {
    id: 'pm4',
    type: 'flutterwave',
    name: 'Flutterwave – Equity Bank Kenya',
    detail: 'finance@globalhealth.org · Kenya (KES) · East Africa',
    badge: { label: 'Active', variant: 'active' },
    isDefault: false,
  },
  {
    id: 'pm3',
    type: 'bank',
    name: 'Bank Transfer (Barclays UK)',
    detail: 'Sort: 20-15-47 · Ref: VORA-EN-20250001',
    badge: { label: 'Manual', variant: 'manual' },
    isDefault: false,
  },
];

export const PAYMENT_SECURITY_NOTE =
  'VORA never stores card numbers. Card data is tokenised by Stripe (PCI DSS Level 1). Paystack and Flutterwave handle local African payments with full regulatory compliance. Removing a method does not affect active escrow or pending transactions.';

export const SUPPORTED_GATEWAYS: SupportedGateway[] = [
  {
    id: 'stripe',
    title: 'Stripe – Cards',
    description: 'Visa, Mastercard, Amex · Global North · Instant',
    regions: 'UK · EU · US · Canada · Australia',
    iconBg: '#EBF6FF',
    iconStroke: '#0047CC',
  },
  {
    id: 'paystack',
    title: 'Paystack',
    description: 'Cards, USSD, mobile money, bank transfer',
    regions: "Nigeria · Ghana · Kenya · Côte d'Ivoire · Rwanda · South Africa",
    iconBg: '#e0f7f7',
    iconStroke: '#00838f',
  },
  {
    id: 'flutterwave',
    title: 'Flutterwave',
    description: 'Cards, M-Pesa, MTN MoMo, bank transfer, 150+ currencies',
    regions:
      'Kenya · Uganda · Tanzania · Zambia · Rwanda · Ghana · Nigeria · Senegal · Cameroon · 30+ countries',
    iconBg: '#fff7ed',
    iconStroke: '#C2410C',
  },
  {
    id: 'bank',
    title: 'Bank Transfer',
    description: 'SWIFT/IBAN · Any bank worldwide · No processing fee',
    regions: '1–3 business days · Universal fallback',
    iconBg: '#F5F3FF',
    iconStroke: '#7C3AED',
  },
];

export const LOCATION_ROUTING_SECTIONS: LocationRoutingSection[] = [
  {
    label: 'West Africa',
    rows: [
      { region: "Nigeria · Ghana · Côte d'Ivoire", gateway: 'Paystack', gatewayColor: '#00838f' },
      { region: 'Senegal · Cameroon · others', gateway: 'Flutterwave', gatewayColor: '#C2410C' },
    ],
  },
  {
    label: 'East Africa',
    rows: [
      {
        region: 'Kenya · Rwanda',
        gateway: 'Paystack',
        gatewayColor: '#00838f',
        secondaryGateway: 'Flutterwave',
      },
      { region: 'Uganda · Tanzania · Zambia · others', gateway: 'Flutterwave', gatewayColor: '#C2410C' },
    ],
  },
  {
    label: 'Global North',
    rows: [{ region: 'UK · EU · US · Canada', gateway: 'Stripe', gatewayColor: '#0047CC' }],
  },
  {
    label: 'Everywhere',
    rows: [{ region: 'Global fallback', gateway: 'Bank Transfer (SWIFT)', gatewayColor: '#7C3AED' }],
  },
];

export const BANK_METHOD_COUNTRIES = [
  'Nigeria',
  'Kenya',
  'Ghana',
  'Uganda',
  'Tanzania',
  'South Africa',
  'United Kingdom',
  'United States',
  'Germany',
  'India',
];
