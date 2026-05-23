import type {
  CompensationProgrammeType,
  CompensationType,
  UpdateRolePostingStepFiveRequest,
} from '../types/rolePosting';
import type { CompType } from './postJobValidation';

export interface StepFiveFormValues {
  compType: CompType;
  salCur: string;
  conCur: string;
  stiCur: string;
  phdCur: string;
  uniCur: string;
  salMin: string;
  salMax: string;
  conMin: string;
  conMax: string;
  stiVal: string;
  phdVal: string;
  uniTuition: string;
  uniProg: string;
  positions: string;
  uniStudentCount: string;
  conDuration: number;
  stiDuration: number;
  durationPreset: string;
  expenses: string;
  internalNotes: string;
}

const COMP_TYPE_TO_API: Record<CompType, CompensationType> = {
  sal: 'SALARIED',
  con: 'CONTRACT_DAILY_RATE',
  sti: 'STIPEND_FELLOWSHIP',
  unp: 'UNPAID_FLAT_FEE',
  phd: 'FUNDED_PHD',
  uni: 'UNIVERSITY_ADMISSIONS',
};

const DURATION_PRESET_TO_MONTHS: Record<string, number> = {
  '22': 1,
  '65': 3,
  '110': 6,
  '165': 9,
  '220': 12,
  '330': 18,
  '440': 24,
};

function parsePositiveNumber(value: string): number | undefined {
  const n = parseFloat(value);
  if (Number.isNaN(n) || n < 0) return undefined;
  return n;
}

function resolveCompensationCurrency(values: StepFiveFormValues): string {
  switch (values.compType) {
    case 'sal':
      return values.salCur;
    case 'con':
      return values.conCur;
    case 'sti':
      return values.stiCur;
    case 'phd':
      return values.phdCur;
    case 'uni':
      return values.uniCur;
    default:
      return 'USD';
  }
}

function resolveContractDurationMonths(values: StepFiveFormValues): number {
  if (values.compType === 'sti') {
    return values.stiDuration || 12;
  }

  if (values.durationPreset !== 'custom') {
    return DURATION_PRESET_TO_MONTHS[values.durationPreset] ?? 12;
  }

  const estimatedMonths = Math.max(1, Math.round(values.conDuration / 22));
  return Math.min(estimatedMonths, 120);
}

function mapProgrammeType(prog: string): CompensationProgrammeType | undefined {
  const normalized = prog.trim().toLowerCase();
  if (!normalized) return undefined;
  if (normalized.includes('mph') || normalized.includes('mba') || normalized.includes('mpa')) {
    return 'MPH';
  }
  if (normalized.includes('msc') || normalized.includes('ma ') || normalized.includes('mphil')) {
    return 'MSC';
  }
  if (normalized.includes('undergraduate') || normalized.includes('bsc') || normalized.includes('ba ')) {
    return 'UNDERGRADUATE';
  }
  if (normalized.includes('short course') || normalized.includes('cpd')) {
    return 'SHORT_COURSE';
  }
  if (normalized.includes('phd')) {
    return 'PHD';
  }
  return 'OTHER';
}

export function buildUpdateRolePostingStepFiveBody(
  values: StepFiveFormValues,
  options?: { advanceStep?: boolean }
): UpdateRolePostingStepFiveRequest {
  const compensationType = COMP_TYPE_TO_API[values.compType];
  const compensationCurrency = resolveCompensationCurrency(values).toUpperCase();

  const body: UpdateRolePostingStepFiveRequest = {
    advanceStep: options?.advanceStep ?? false,
    compensationType,
    compensationCurrency,
  };

  const notes = values.internalNotes.trim();
  if (notes) body.internalNotes = notes;

  switch (values.compType) {
    case 'sal': {
      body.positionsAvailable = parseInt(values.positions, 10) || 1;
      const salaryMin = parsePositiveNumber(values.salMin);
      const salaryMax = parsePositiveNumber(values.salMax);
      if (salaryMin != null) body.salaryMin = salaryMin;
      if (salaryMax != null) body.salaryMax = salaryMax;
      break;
    }
    case 'con': {
      body.positionsAvailable = parseInt(values.positions, 10) || 1;
      const dailyRateMin = parsePositiveNumber(values.conMin);
      const dailyRateMax = parsePositiveNumber(values.conMax);
      if (dailyRateMin != null) body.dailyRateMin = dailyRateMin;
      if (dailyRateMax != null) body.dailyRateMax = dailyRateMax;
      body.isOpenEnded = false;
      body.contractDurationMonths = resolveContractDurationMonths(values);
      break;
    }
    case 'sti': {
      body.positionsAvailable = parseInt(values.positions, 10) || 1;
      if (values.stiVal.trim()) body.stipendValue = values.stiVal.trim();
      body.contractDurationMonths = resolveContractDurationMonths(values);
      break;
    }
    case 'phd': {
      const yearOneStipend = parsePositiveNumber(values.phdVal);
      if (yearOneStipend != null) body.yearOneStipend = yearOneStipend;
      break;
    }
    case 'uni': {
      body.positionsAvailable = parseInt(values.uniStudentCount, 10) || 1;
      const annualTuitionValue = parsePositiveNumber(values.uniTuition);
      if (annualTuitionValue != null) body.annualTuitionValue = annualTuitionValue;
      const programmeType = mapProgrammeType(values.uniProg);
      if (programmeType) body.programmeType = programmeType;
      break;
    }
    case 'unp': {
      const expenses = values.expenses.trim();
      if (expenses) body.expensesAllowancesBenefits = expenses;
      break;
    }
    default:
      break;
  }

  return body;
}
