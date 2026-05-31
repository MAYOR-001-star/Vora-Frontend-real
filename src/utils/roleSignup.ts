export const getRoleSignupPath = (slug: string): string =>
  `/role/${encodeURIComponent(slug)}/signup`;

export const ROLE_APPLY_SLUG_KEY = 'voraRoleApplySlug';

export const saveRoleApplySlug = (slug: string): void => {
  sessionStorage.setItem(ROLE_APPLY_SLUG_KEY, slug);
};

export const loadRoleApplySlug = (): string | null =>
  sessionStorage.getItem(ROLE_APPLY_SLUG_KEY);

export const clearRoleApplySlug = (): void => {
  sessionStorage.removeItem(ROLE_APPLY_SLUG_KEY);
};

export const extractSalaryShort = (compensationLine: string, overviewSalary?: string): string => {
  const fromOverview = overviewSalary?.trim();
  if (fromOverview) {
    return fromOverview.replace(/\/month$/i, '/mo').replace(/ monthly$/i, '/mo');
  }
  const match = compensationLine.match(/\$[\d,]+(?:\s*\/\s*mo(?:nthly)?)?/i);
  if (match) {
    return match[0].replace(/ monthly/i, '/mo').replace(/\/month/i, '/mo');
  }
  return '';
};
