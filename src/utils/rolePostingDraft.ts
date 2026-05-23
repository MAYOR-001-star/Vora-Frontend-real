import { ROLE_POSTING_DRAFT_STORAGE_KEY } from '../constants/rolePosting';
import type { PostJobContinueConfig, RolePostingDraftSession } from '../types/rolePosting';

export function saveRolePostingDraft(config: PostJobContinueConfig): void {
  const session: RolePostingDraftSession = {
    id: config.rolePostingId,
    hiringMode: config.hiringMode,
    fillMethod: config.fillMethod,
    isScheduled: config.isScheduled,
    goLiveDate: config.goLiveDate,
    isPrefilled: config.isPrefilled,
    currentStep: config.currentStep,
  };
  try {
    sessionStorage.setItem(ROLE_POSTING_DRAFT_STORAGE_KEY, JSON.stringify(session));
  } catch {
    /* ignore */
  }
}

export function loadRolePostingDraft(): RolePostingDraftSession | null {
  try {
    const raw = sessionStorage.getItem(ROLE_POSTING_DRAFT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as RolePostingDraftSession;
  } catch {
    return null;
  }
}

export function updateRolePostingDraftStep(currentStep: number): void {
  const draft = loadRolePostingDraft();
  if (!draft) return;
  saveRolePostingDraft({
    isScheduled: draft.isScheduled,
    goLiveDate: draft.goLiveDate,
    isPrefilled: draft.isPrefilled,
    rolePostingId: draft.id,
    currentStep,
    hiringMode: draft.hiringMode,
    fillMethod: draft.fillMethod,
  });
}

export function clearRolePostingDraft(): void {
  try {
    sessionStorage.removeItem(ROLE_POSTING_DRAFT_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
