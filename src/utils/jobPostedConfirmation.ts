import { JOB_POSTED_CONFIRMATION_STORAGE_KEY } from '../constants/jobPostedConfirmation';
import type { JobPostedConfirmationData } from '../types/jobPostedConfirmation';
import {
  buildRoleLandingData,
  buildRoleShareUrl,
  buildRoleSlug,
  saveRoleLanding,
} from './roleLanding';

export interface JobPostedConfirmationInput {
  jobId?: string | null;
  roleTitle?: string;
  workFormat?: string;
  location?: string;
  positions?: string | number;
  summary?: string;
  roleGoal?: string;
  coreResponsibilities?: string;
}

const formatWorkFormatLabel = (workFormat: string): string => {
  if (workFormat === 'Hybrid') return 'Hybrid';
  if (workFormat === 'Fully onsite') return 'On-site';
  if (workFormat.startsWith('Remote')) return 'Remote';
  if (workFormat === 'Flexible / candidate preference') return 'Flexible';
  return workFormat.split(' ')[0] || workFormat;
};

const formatLocationShort = (location: string): string => {
  if (!location.trim()) return 'Location TBC';
  const parts = location.split(',').map((p) => p.trim()).filter(Boolean);
  return parts[parts.length - 1] ?? location;
};

export const buildJobPostedConfirmationData = (
  input: JobPostedConfirmationInput = {},
): JobPostedConfirmationData => {
  const roleTitle = input.roleTitle?.trim() || 'Untitled role';
  const workFormat = input.workFormat || 'Hybrid';
  const location = input.location?.trim() || '';
  const positions = parseInt(String(input.positions ?? '1'), 10) || 1;
  const slug = buildRoleSlug(roleTitle);

  const landingData = buildRoleLandingData({
    slug,
    roleTitle,
    workFormat,
    location,
    positions,
    summary: input.summary,
    roleGoal: input.roleGoal,
    coreResponsibilities: input.coreResponsibilities,
  });
  saveRoleLanding(landingData);

  return {
    jobId: input.jobId ?? null,
    slug,
    roleTitle,
    workFormat,
    location,
    formatLocationLabel: `${formatWorkFormatLabel(workFormat)} · ${formatLocationShort(location)}`,
    positions,
    shareUrl: buildRoleShareUrl(slug),
    candidatesMatched: 0,
  };
};

export const saveJobPostedConfirmation = (data: JobPostedConfirmationData): void => {
  sessionStorage.setItem(JOB_POSTED_CONFIRMATION_STORAGE_KEY, JSON.stringify(data));
};

export const loadJobPostedConfirmation = (): JobPostedConfirmationData | null => {
  try {
    const raw = sessionStorage.getItem(JOB_POSTED_CONFIRMATION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as JobPostedConfirmationData;
  } catch {
    return null;
  }
};
