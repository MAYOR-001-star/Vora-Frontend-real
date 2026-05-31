import { DEFAULT_PUBLIC_ROLE_LANDING, ROLE_LANDING_STORAGE_PREFIX } from '../constants/roleLanding';
import type { PublicRoleLandingData } from '../types/roleLanding';

export interface RoleLandingBuildInput {
  slug: string;
  roleTitle?: string;
  workFormat?: string;
  location?: string;
  positions?: string | number;
  summary?: string;
  roleGoal?: string;
  coreResponsibilities?: string;
  companyName?: string;
}

export const slugifyRoleTitle = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'role';

export const buildRoleSlug = (roleTitle: string): string => {
  const suffix = `${new Date().getFullYear()}${String(Math.floor(Math.random() * 900) + 100)}`;
  return `${slugifyRoleTitle(roleTitle)}-${suffix}`;
};

export const buildRoleShareUrl = (slug: string): string => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/role/${slug}`;
  }
  return `/role/${slug}`;
};

const formatWorkFormatLabel = (workFormat: string, location: string): string => {
  const loc = location.trim() || 'Location TBC';
  if (workFormat === 'Hybrid') return `Hybrid · ${loc}`;
  if (workFormat === 'Fully onsite') return `On-site · ${loc}`;
  if (workFormat.startsWith('Remote')) return `Remote · ${loc}`;
  if (workFormat === 'Flexible / candidate preference') return `Flexible · ${loc}`;
  return `${workFormat} · ${loc}`;
};

const splitLines = (text: string): string[] =>
  text
    .split(/\n+/)
    .map((line) => line.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean);

export const buildRoleLandingData = (input: RoleLandingBuildInput): PublicRoleLandingData => {
  const roleTitle = input.roleTitle?.trim() || DEFAULT_PUBLIC_ROLE_LANDING.roleTitle;
  const location = input.location?.trim() || '';
  const positions = parseInt(String(input.positions ?? '1'), 10) || 1;
  const formatLocationLabel = formatWorkFormatLabel(
    input.workFormat || 'Hybrid',
    location,
  );

  const responsibilities = input.coreResponsibilities
    ? splitLines(input.coreResponsibilities)
    : DEFAULT_PUBLIC_ROLE_LANDING.responsibilities;

  const aboutRole =
    input.summary?.trim() ||
    input.roleGoal?.trim() ||
    DEFAULT_PUBLIC_ROLE_LANDING.aboutRole;

  const overviewRows = DEFAULT_PUBLIC_ROLE_LANDING.overviewRows.map((row) => {
    if (row.label === 'Location' && location) return { ...row, value: location };
    if (row.label === 'Format') return { ...row, value: formatLocationLabel };
    if (row.label === 'Positions') {
      return {
        ...row,
        value: `${positions} available`,
      };
    }
    return row;
  });

  return {
    ...DEFAULT_PUBLIC_ROLE_LANDING,
    slug: input.slug,
    roleTitle,
    formatLocationLabel,
    companyName: input.companyName?.trim() || DEFAULT_PUBLIC_ROLE_LANDING.companyName,
    companyLocation: location || DEFAULT_PUBLIC_ROLE_LANDING.companyLocation,
    compensationLine: `Compensation TBC · ${positions} position${positions === 1 ? '' : 's'} available`,
    metaItems: [
      input.workFormat || 'Full-time',
      formatLocationLabel,
      'Posted today',
    ],
    aboutRole,
    responsibilities: responsibilities.length > 0 ? responsibilities : DEFAULT_PUBLIC_ROLE_LANDING.responsibilities,
    overviewRows,
  };
};

export const saveRoleLanding = (data: PublicRoleLandingData): void => {
  sessionStorage.setItem(`${ROLE_LANDING_STORAGE_PREFIX}${data.slug}`, JSON.stringify(data));
};

export const loadRoleLanding = (slug: string): PublicRoleLandingData | null => {
  try {
    const raw = sessionStorage.getItem(`${ROLE_LANDING_STORAGE_PREFIX}${slug}`);
    if (!raw) return null;
    return JSON.parse(raw) as PublicRoleLandingData;
  } catch {
    return null;
  }
};

const humanizeSlug = (slug: string): string =>
  slug
    .replace(/-\d{7}$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

export const getRoleLandingForSlug = (slug: string): PublicRoleLandingData => {
  const saved = loadRoleLanding(slug);
  if (saved) return saved;
  return {
    ...DEFAULT_PUBLIC_ROLE_LANDING,
    slug,
    roleTitle: humanizeSlug(slug),
  };
};
