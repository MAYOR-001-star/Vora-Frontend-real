import type {
  EscrowDetailData,
  EscrowPositionItem,
  RateInfoRow,
  SpendCompositionItem,
  TransactionItem,
  WalletTileData,
} from '../types/paymentsOverview';

export const WALLET_TILES: WalletTileData[] = [
  {
    id: 'balance',
    label: 'Available Balance',
    amount: '$3,240.00',
    sub: 'Ready for escrow & fees · USD',
    badge: '+$500 this month',
    accent: 'blue',
    badgeVariant: 'blue',
  },
  {
    id: 'escrow',
    label: 'In Escrow',
    amount: '$2,550.00',
    sub: '3 active job postings · click to expand',
    badge: '3 positions locked',
    accent: 'orange',
    badgeVariant: 'orange',
  },
  {
    id: 'alignment',
    label: 'Alignment Fees Held',
    amount: '$300.00',
    sub: 'Refundable · 2 sessions pending',
    badge: '2 awaiting decision',
    accent: 'purple',
    badgeVariant: 'purple',
  },
];

export const RECENT_TRANSACTIONS: TransactionItem[] = [
  {
    id: 'tx1',
    icon: 'topup',
    name: 'Wallet Top-Up via Stripe',
    date: 'Today, 09:14 AM · #TXN-2025-0891',
    amount: '+$500.00',
    amountTone: 'positive',
    status: 'completed',
    statusLabel: 'Completed',
  },
  {
    id: 'tx2',
    icon: 'escrow',
    name: 'Escrow Lock, Pediatric Surgeon, Lagos (midpoint $67,500)',
    date: 'Mar 6, 2025 · #ESC-2025-0042 · Range $60k,$75k',
    amount: '−$10,125.00',
    amountTone: 'negative',
    status: 'held',
    statusLabel: 'Held',
  },
  {
    id: 'tx3',
    icon: 'trueup',
    name: 'True-Up Owed, Global Health Research ($75k actual vs $70k midpoint)',
    date: 'Mar 6, 2025 · #TU-2025-0008 · Awaiting payment',
    amount: '$750.00 owed',
    amountTone: 'warning',
    status: 'pending',
    statusLabel: 'Pending',
  },
  {
    id: 'tx4',
    icon: 'trueup-credit',
    name: 'True-Up Credit, Epidemiologist Nairobi ($62k actual vs $70k midpoint)',
    date: 'Mar 3, 2025 · #TU-2025-0006 · Refunded',
    amount: '+$1,200.00',
    amountTone: 'positive',
    status: 'refunded',
    statusLabel: 'Refunded',
  },
  {
    id: 'tx5',
    icon: 'align',
    name: 'Alignment Fee, Dr. Amara Osei (2nd session) · Pending decision',
    date: 'Mar 5, 2025 · #ALN-2025-0015',
    amount: '−$150.00',
    amountTone: 'negative',
    status: 'pending',
    statusLabel: 'Pending',
  },
  {
    id: 'tx6',
    icon: 'refund',
    name: 'Alignment Fee Refund, Dr. Yusuf Ibrahim (Hired) · Auto-refunded',
    date: 'Mar 1, 2025 · #ALN-2025-0012',
    amount: '+$150.00',
    amountTone: 'positive',
    status: 'refunded',
    statusLabel: 'Refunded',
  },
];

export const ESCROW_POSITIONS: EscrowPositionItem[] = [
  {
    id: 'esc1',
    job: 'Pediatric Surgeon, Lagos, Nigeria',
    meta: 'Tee-Company Ltd · Range $60k,$75k · Midpoint $67,500 · 15%',
    amount: '$10,125.00',
  },
  {
    id: 'esc2',
    job: 'Public Health Advisor, Accra, Ghana (Contract 6,12mo)',
    meta: 'Medics Without Limits · Min 6mo deposit · $5,000/mo · Tier 2 data',
    amount: '$4,500.00',
    amountColor: '#D97706',
    dotColor: '#D97706',
  },
  {
    id: 'esc3',
    job: 'Epidemiologist, Nairobi, Kenya · True-up completed',
    meta: 'GlobalHealth Corp · $62k actual · $1,200 credit returned · Hired',
    amount: '$9,300.00 ✓',
    amountColor: '#1D871D',
    dotColor: '#DC2626',
  },
];

export const RATE_INFO_ROWS: RateInfoRow[] = [
  { key: 'Escrow basis', value: 'Midpoint of salary range × fee%' },
  { key: 'Fee rate (Global North)', value: '20% of confirmed salary' },
  { key: 'Fee rate (Global South)', value: '15% of confirmed salary' },
  { key: 'True-up window', value: 'Within 24h of hire confirmation' },
  { key: 'Contract roles', value: 'Min. tenure deposit upfront' },
  { key: 'No-hire search fee', value: '10% of locked escrow (non-refundable)' },
  { key: 'Alignment fee', value: '$150 / session · refundable' },
  { key: 'Min. withdrawal', value: '$50.00' },
];

export const ESCROW_COMPOSITION: SpendCompositionItem[] = [
  { label: 'Pediatric Surgeon', value: '$10,125', percent: 80, barColor: '#7C3AED' },
  { label: 'PH Advisor (contract)', value: '$4,500', percent: 40, barColor: '#D97706' },
  { label: 'Alignment Fees Held', value: '$300', percent: 5, barColor: '#0047CC' },
  { label: 'True-Up Owed', value: '$750', percent: 8, barColor: '#DC2626' },
];

export const ESCROW_DETAILS: Record<string, EscrowDetailData> = {
  esc1: {
    title: 'Pediatric Surgeon, Lagos, Nigeria',
    ref: '#ESC-2025-0042',
    rows: [
      { label: 'Employer', value: 'Tee-Company Limited' },
      { label: 'Job location', value: 'Lagos, Nigeria (Global South)' },
      { label: 'Fee rate', value: '15% of confirmed salary' },
      { label: 'Salary range declared', value: '$60,000, $75,000' },
      { label: 'Midpoint (auto-calculated)', value: '$67,500' },
      { label: 'Escrow locked at upload', value: '$10,125.00 (15% × $67,500)' },
      { label: 'Lock date', value: 'Mar 6, 2025' },
      { label: 'Status', value: 'Active, awaiting hire confirmation' },
      { label: 'Data tier', value: 'Tier 1, verified USAID benchmark' },
      { label: 'Currency', value: 'USD locked at upload' },
    ],
    trueupNote:
      'On hire confirmation, employer must declare the final accepted salary. If $72,000 actual: true-up owed = (15% × $72,000) − $10,125 = $675. If $65,000 actual: credit returned = $10,125 − (15% × $65,000) = $375. True-up fires within 24 hours of hire confirmation.',
  },
  esc2: {
    title: 'Public Health Advisor, Accra, Ghana (Contract)',
    ref: '#ESC-2025-0039',
    rows: [
      { label: 'Employer', value: 'Medics Without Limits' },
      { label: 'Role type', value: 'Contract: 6,12 months' },
      { label: 'Contract rate', value: '$5,000 / month' },
      { label: 'Annualised equivalent', value: '$60,000' },
      { label: 'Min. tenure (6 months)', value: '$30,000 total compensation' },
      { label: 'Escrow at upload', value: '$4,500 (15% × $30,000 min.)' },
      { label: 'Lock date', value: 'Feb 22, 2025' },
      { label: 'Status', value: 'Active, min. tenure deposit held' },
      { label: 'True-up trigger', value: 'Contract conclusion declaration required' },
      { label: 'Data tier', value: 'Tier 2, regional PPP proxy (Ghana)' },
    ],
    trueupNote:
      'At contract conclusion, employer declares actual duration. If 10 months: total comp = $50,000, final fee = $7,500. True-up owed = $7,500 − $4,500 = $3,000. If ended at 6 months as minimum stated: no top-up, escrow releases in full.',
  },
  esc3: {
    title: 'Epidemiologist, Nairobi, Kenya (Hired & Closed)',
    ref: '#ESC-2025-0031',
    rows: [
      { label: 'Employer', value: 'GlobalHealth Corp' },
      { label: 'Job location', value: 'Nairobi, Kenya (Global South)' },
      { label: 'Fee rate', value: '15% confirmed salary' },
      { label: 'Range declared', value: '$60,000, $80,000' },
      { label: 'Midpoint at upload', value: '$70,000' },
      { label: 'Escrow locked', value: '$10,500 (15% × $70,000)' },
      { label: 'Final declared salary', value: '$62,000 (confirmed at hire)' },
      { label: 'Final fee owed', value: '$9,300 (15% × $62,000)' },
      { label: 'True-up credit returned', value: '$1,200.00 (auto-refunded Mar 3, 2025)' },
      { label: 'Status', value: 'Closed, hired' },
    ],
    trueupNote:
      'Actual salary $62,000 was below midpoint. Fee calculated: 15% × $62,000 = $9,300. Escrow held was $10,500. Credit = $1,200 returned automatically to employer wallet within 24 hours of hire confirmation on Mar 3, 2025.',
  },
};
