import type {
  EmploymentLevel,
  RolePostingHiringMode,
  UpdateRolePostingStepOneRequest,
  WorkFormat,
} from '../types/rolePosting';
import { formatTimeCommitmentForApi } from './numericInput';

export interface StepOneFormValues {
  roleType: string;
  roleTitle: string;
  level: string;
  positions: string;
  timeCommitment: string;
  workFormat: string;
  location: string;
  additionalLocations: string[];
  selectedTimezoneRegions: string[];
  selectedTimezones: string[];
  startDate: string;
  endDate: string;
  summary: string;
  internationalPolicy: string;
  securityClearance: string;
  selectedWorkPermits: string[];
  isScheduled: boolean;
  goLiveDate: string;
  hiringMode: RolePostingHiringMode;
}

const EMPLOYMENT_LEVEL_TO_API: Record<string, EmploymentLevel> = {
  'Student / Graduate': 'STUDENT_GRADUATE',
  student: 'STUDENT_GRADUATE',
  'Entry level': 'ENTRY',
  'Mid level': 'MID',
  'Senior level': 'SENIOR',
  'Executive / Director': 'EXECUTIVE',
};

const WORK_FORMAT_TO_API: Record<string, WorkFormat> = {
  'Fully onsite': 'FULLY_ONSITE',
  Hybrid: 'HYBRID',
  'Remote - specific timezone(s) required': 'REMOTE_TIMEZONE',
  'Remote - no timezone restriction': 'REMOTE_NO_TIMEZONE',
  'Flexible / candidate preference': 'FLEXIBLE',
};

export function mapEmploymentLevelToApi(level: string): EmploymentLevel | undefined {
  if (!level) return undefined;
  const direct = EMPLOYMENT_LEVEL_TO_API[level];
  if (direct) return direct;
  const upper = level.toUpperCase().replace(/\s+/g, '_').replace(/\//g, '_');
  if (
    upper === 'STUDENT_GRADUATE' ||
    upper === 'ENTRY' ||
    upper === 'MID' ||
    upper === 'SENIOR' ||
    upper === 'EXECUTIVE'
  ) {
    return upper as EmploymentLevel;
  }
  return undefined;
}

export function mapWorkFormatToApi(workFormat: string): WorkFormat | undefined {
  if (!workFormat) return undefined;
  const direct = WORK_FORMAT_TO_API[workFormat];
  if (direct) return direct;
  const normalized = workFormat.toUpperCase().replace(/\s+/g, '_').replace(/-/g, '_');
  if (
    normalized === 'FULLY_ONSITE' ||
    normalized === 'HYBRID' ||
    normalized === 'REMOTE_TIMEZONE' ||
    normalized === 'REMOTE_NO_TIMEZONE' ||
    normalized === 'FLEXIBLE'
  ) {
    return normalized as WorkFormat;
  }
  return undefined;
}

export function toApiDateOnly(dateStr: string): string | undefined {
  if (!dateStr?.trim()) return undefined;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString().slice(0, 10);
}

function resolveWorkLocationPrimary(
  location: string,
  workFormat: WorkFormat
): string {
  const trimmed = location.trim();
  if (trimmed) return trimmed;
  if (workFormat === 'REMOTE_NO_TIMEZONE') return 'Remote - global';
  return trimmed;
}

export function buildUpdateRolePostingStepOneBody(
  values: StepOneFormValues,
  options?: { advanceStep?: boolean }
): UpdateRolePostingStepOneRequest {
  const employmentLevel = mapEmploymentLevelToApi(values.level);
  const workFormat = mapWorkFormatToApi(values.workFormat);

  if (!employmentLevel) {
    throw new Error('Invalid employment level');
  }
  if (!workFormat) {
    throw new Error('Invalid work format');
  }

  const isVault = values.hiringMode === 'VAULT';
  const scheduledHiringEnabled = !isVault && values.isScheduled;

  const body: UpdateRolePostingStepOneRequest = {
    advanceStep: options?.advanceStep ?? false,
    roleTitle: values.roleTitle.trim(),
    roleType: values.roleType,
    employmentLevel,
    positionsAvailable: parseInt(values.positions, 10) || 1,
    timeCommitment: formatTimeCommitmentForApi(values.timeCommitment) || undefined,
    workFormat,
    workLocationPrimary: resolveWorkLocationPrimary(values.location, workFormat),
    startDate: toApiDateOnly(values.startDate)!,
    roleSummary: values.summary.trim(),
    internationalTalentPolicy: values.internationalPolicy,
    scheduledHiringEnabled,
  };

  const closing = toApiDateOnly(values.endDate);
  if (closing) body.closingDate = closing;

  if (
    (workFormat === 'FULLY_ONSITE' || workFormat === 'HYBRID') &&
    values.additionalLocations.length > 0
  ) {
    body.additionalHiringLocations = values.additionalLocations;
  }

  if (workFormat !== 'FULLY_ONSITE') {
    if (values.selectedTimezoneRegions.length > 0) {
      body.timezoneRegions = values.selectedTimezoneRegions;
    }
    if (values.selectedTimezones.length > 0) {
      body.timezoneRequirements = values.selectedTimezones;
    }
  }

  if (values.securityClearance.trim()) {
    body.securityClearanceRequirement = values.securityClearance;
  }

  if (values.selectedWorkPermits.length > 0) {
    body.workPermitTypesAccepted = values.selectedWorkPermits;
  }

  if (scheduledHiringEnabled && values.goLiveDate) {
    const goLive = toApiDateOnly(values.goLiveDate);
    if (goLive) body.scheduledGoLiveDate = goLive;
  }

  return body;
}
