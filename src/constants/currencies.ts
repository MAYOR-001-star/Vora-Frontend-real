import type { Option, OptionGroup } from '../types';

/** Grouped currencies for compensation fields (Post Job wizard, etc.). */
export const GLOBAL_CURRENCY_GROUPS: OptionGroup[] = [
  {
    label: 'Major Global',
    options: [
      { label: 'USD — US Dollar $', value: 'USD' },
      { label: 'EUR — Euro €', value: 'EUR' },
      { label: 'GBP — British Pound £', value: 'GBP' },
      { label: 'CHF — Swiss Franc', value: 'CHF' },
      { label: 'JPY — Japanese Yen ¥', value: 'JPY' },
      { label: 'CAD — Canadian Dollar CA$', value: 'CAD' },
      { label: 'AUD — Australian Dollar A$', value: 'AUD' },
      { label: 'NZD — New Zealand Dollar NZ$', value: 'NZD' },
    ],
  },
  {
    label: 'Europe',
    options: [
      { label: 'SEK — Swedish Krona kr', value: 'SEK' },
      { label: 'NOK — Norwegian Krone kr', value: 'NOK' },
      { label: 'DKK — Danish Krone kr', value: 'DKK' },
      { label: 'PLN — Polish Złoty zł', value: 'PLN' },
      { label: 'CZK — Czech Koruna Kč', value: 'CZK' },
      { label: 'HUF — Hungarian Forint Ft', value: 'HUF' },
      { label: 'RON — Romanian Leu lei', value: 'RON' },
      { label: 'BGN — Bulgarian Lev лв', value: 'BGN' },
      { label: 'TRY — Turkish Lira ₺', value: 'TRY' },
    ],
  },
  {
    label: 'Gulf & Middle East',
    options: [
      { label: 'AED — UAE Dirham', value: 'AED' },
      { label: 'SAR — Saudi Riyal', value: 'SAR' },
      { label: 'QAR — Qatari Riyal', value: 'QAR' },
      { label: 'KWD — Kuwaiti Dinar', value: 'KWD' },
      { label: 'BHD — Bahraini Dinar', value: 'BHD' },
      { label: 'OMR — Omani Rial', value: 'OMR' },
      { label: 'JOD — Jordanian Dinar', value: 'JOD' },
      { label: 'ILS — Israeli Shekel ₪', value: 'ILS' },
      { label: 'EGP — Egyptian Pound', value: 'EGP' },
      { label: 'LBP — Lebanese Pound', value: 'LBP' },
    ],
  },
  {
    label: 'West Africa',
    options: [
      { label: 'NGN — Nigerian Naira ₦', value: 'NGN' },
      { label: 'GHS — Ghanaian Cedi GH₵', value: 'GHS' },
      { label: 'XOF — West African CFA Franc', value: 'XOF' },
      { label: 'XAF — Central African CFA Franc', value: 'XAF' },
      { label: 'SLL — Sierra Leonean Leone', value: 'SLL' },
      { label: 'LRD — Liberian Dollar', value: 'LRD' },
      { label: 'GMD — Gambian Dalasi', value: 'GMD' },
      { label: 'GNF — Guinean Franc', value: 'GNF' },
    ],
  },
  {
    label: 'East Africa',
    options: [
      { label: 'KES — Kenyan Shilling KSh', value: 'KES' },
      { label: 'TZS — Tanzanian Shilling TSh', value: 'TZS' },
      { label: 'UGX — Ugandan Shilling USh', value: 'UGX' },
      { label: 'ETB — Ethiopian Birr Br', value: 'ETB' },
      { label: 'RWF — Rwandan Franc RF', value: 'RWF' },
      { label: 'BIF — Burundian Franc', value: 'BIF' },
      { label: 'DJF — Djiboutian Franc', value: 'DJF' },
      { label: 'ERN — Eritrean Nakfa', value: 'ERN' },
      { label: 'SOS — Somali Shilling', value: 'SOS' },
      { label: 'SDG — Sudanese Pound', value: 'SDG' },
      { label: 'SSP — South Sudanese Pound', value: 'SSP' },
    ],
  },
  {
    label: 'Southern Africa',
    options: [
      { label: 'ZAR — South African Rand R', value: 'ZAR' },
      { label: 'ZMW — Zambian Kwacha ZK', value: 'ZMW' },
      { label: 'MWK — Malawian Kwacha', value: 'MWK' },
      { label: 'BWP — Botswana Pula', value: 'BWP' },
      { label: 'NAD — Namibian Dollar N$', value: 'NAD' },
      { label: 'LSL — Lesotho Loti', value: 'LSL' },
      { label: 'SZL — Swazi Lilangeni', value: 'SZL' },
    ],
  },
  {
    label: 'North Africa',
    options: [
      { label: 'MAD — Moroccan Dirham', value: 'MAD' },
      { label: 'DZD — Algerian Dinar', value: 'DZD' },
      { label: 'TND — Tunisian Dinar', value: 'TND' },
    ],
  },
  {
    label: 'Indian Ocean',
    options: [
      { label: 'MUR — Mauritian Rupee', value: 'MUR' },
      { label: 'SCR — Seychellois Rupee', value: 'SCR' },
      { label: 'MGA — Malagasy Ariary', value: 'MGA' },
      { label: 'KMF — Comorian Franc', value: 'KMF' },
    ],
  },
  {
    label: 'South Asia',
    options: [
      { label: 'INR — Indian Rupee ₹', value: 'INR' },
      { label: 'PKR — Pakistani Rupee Rs', value: 'PKR' },
      { label: 'BDT — Bangladeshi Taka ৳', value: 'BDT' },
      { label: 'LKR — Sri Lankan Rupee', value: 'LKR' },
      { label: 'NPR — Nepalese Rupee', value: 'NPR' },
    ],
  },
  {
    label: 'Southeast Asia',
    options: [
      { label: 'SGD — Singapore Dollar S$', value: 'SGD' },
      { label: 'MYR — Malaysian Ringgit RM', value: 'MYR' },
      { label: 'PHP — Philippine Peso ₱', value: 'PHP' },
      { label: 'IDR — Indonesian Rupiah Rp', value: 'IDR' },
      { label: 'THB — Thai Baht ฿', value: 'THB' },
      { label: 'VND — Vietnamese Dong ₫', value: 'VND' },
      { label: 'KHR — Cambodian Riel', value: 'KHR' },
      { label: 'MMK — Myanmar Kyat', value: 'MMK' },
    ],
  },
  {
    label: 'East Asia',
    options: [
      { label: 'CNY — Chinese Yuan Renminbi ¥', value: 'CNY' },
      { label: 'HKD — Hong Kong Dollar HK$', value: 'HKD' },
      { label: 'TWD — Taiwan Dollar NT$', value: 'TWD' },
      { label: 'KRW — South Korean Won ₩', value: 'KRW' },
    ],
  },
  {
    label: 'Latin America',
    options: [
      { label: 'BRL — Brazilian Real R$', value: 'BRL' },
      { label: 'MXN — Mexican Peso MX$', value: 'MXN' },
      { label: 'COP — Colombian Peso COP$', value: 'COP' },
      { label: 'PEN — Peruvian Sol S/', value: 'PEN' },
      { label: 'CLP — Chilean Peso CLP$', value: 'CLP' },
      { label: 'ARS — Argentine Peso $', value: 'ARS' },
      { label: 'UYU — Uruguayan Peso', value: 'UYU' },
      { label: 'BOB — Bolivian Boliviano Bs', value: 'BOB' },
      { label: 'GTQ — Guatemalan Quetzal Q', value: 'GTQ' },
      { label: 'DOP — Dominican Peso RD$', value: 'DOP' },
      { label: 'JMD — Jamaican Dollar J$', value: 'JMD' },
      { label: 'TTD — Trinidad & Tobago Dollar TT$', value: 'TTD' },
    ],
  },
];

export const PHD_CURRENCY_OPTIONS: Option[] = [
  { label: 'GBP — British Pound £', value: 'GBP' },
  { label: 'USD — US Dollar $', value: 'USD' },
  { label: 'EUR — Euro €', value: 'EUR' },
  { label: 'CHF — Swiss Franc', value: 'CHF' },
  { label: 'SEK — Swedish Krona kr', value: 'SEK' },
  { label: 'NOK — Norwegian Krone kr', value: 'NOK' },
  { label: 'DKK — Danish Krone kr', value: 'DKK' },
  { label: 'AUD — Australian Dollar A$', value: 'AUD' },
  { label: 'CAD — Canadian Dollar CA$', value: 'CAD' },
];

export const UNI_PROGRAMME_GROUPS: OptionGroup[] = [
  {
    label: 'Taught Programmes',
    options: [
      { label: 'MSc / MA / MPhil (1 year)', value: 'MSc / MA / MPhil (1 year)' },
      { label: 'MPH / MBA / MPA (1–2 years)', value: 'MPH / MBA / MPA (1–2 years)' },
      {
        label: 'Undergraduate BSc / BM / BDS (3–6 years)',
        value: 'Undergraduate BSc / BM / BDS (3–6 years)',
      },
      {
        label: 'Short course / CPD certificate (under 6 months)',
        value: 'Short course / CPD certificate (under 6 months)',
      },
    ],
  },
  {
    label: 'Research Programmes',
    options: [
      {
        label: 'Self-funded PhD (3–4 years)',
        value: 'Self-funded PhD (3–4 years)',
      },
    ],
  },
];

export const UNI_CURRENCY_OPTIONS: Option[] = [
  { label: 'USD — US Dollar $', value: 'USD' },
  { label: 'GBP — British Pound £', value: 'GBP' },
  { label: 'EUR — Euro €', value: 'EUR' },
  { label: 'CAD — Canadian Dollar CA$', value: 'CAD' },
  { label: 'AUD — Australian Dollar A$', value: 'AUD' },
  { label: 'NZD — New Zealand Dollar NZ$', value: 'NZD' },
  { label: 'CHF — Swiss Franc', value: 'CHF' },
  { label: 'SEK — Swedish Krona kr', value: 'SEK' },
  { label: 'SGD — Singapore Dollar S$', value: 'SGD' },
];
