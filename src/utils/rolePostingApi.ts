import { parseISODate } from './date';
import type {
  CreateRolePostingIntakeRequest,
  RolePostingFillMethod,
  RolePostingHiringMode,
} from '../types/rolePosting';

export function toVaultGoLiveISO(dateOnly: string): string {
  const date = parseISODate(dateOnly);
  if (!date) return '';
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0, 0, 0)
  ).toISOString();
}

export function mapHireModeToApi(hireMode: 'live' | 'vault'): RolePostingHiringMode {
  return hireMode === 'vault' ? 'VAULT' : 'LIVE_NOW';
}

export function mapFillMethodToApi(
  fillMethod: 'upload' | 'manual'
): RolePostingFillMethod {
  return fillMethod === 'upload' ? 'JD_UPLOAD' : 'MANUAL';
}

export function buildCreateRolePostingIntakeBody(
  hireMode: 'live' | 'vault',
  fillMethod: 'upload' | 'manual',
  goLiveDate?: string
): CreateRolePostingIntakeRequest {
  const hiringMode = mapHireModeToApi(hireMode);
  const body: CreateRolePostingIntakeRequest = {
    hiringMode,
    fillMethod: mapFillMethodToApi(fillMethod),
  };

  if (hiringMode === 'VAULT' && goLiveDate) {
    body.vaultGoLiveDate = toVaultGoLiveISO(goLiveDate);
  }

  return body;
}
