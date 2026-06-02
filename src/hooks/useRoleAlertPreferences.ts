import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { DEFAULT_ROLE_ALERT_PREFERENCES } from '../constants/profileMatchWaitlist';
import type { RoleAlertPreferences } from '../types/profileMatchWaitlist';

const EMPTY_OTHER_LABEL = 'No additional requirements';

export const useRoleAlertPreferences = (
  initialPreferences: RoleAlertPreferences = DEFAULT_ROLE_ALERT_PREFERENCES,
) => {
  const [preferences, setPreferences] = useState<RoleAlertPreferences>(initialPreferences);
  const [draft, setDraft] = useState<RoleAlertPreferences>(initialPreferences);
  const [isEditing, setIsEditing] = useState(false);
  const [alertSet, setAlertSet] = useState(false);

  const startEdit = useCallback(() => {
    setDraft({
      ...preferences,
      otherPreferences:
        preferences.otherPreferences === EMPTY_OTHER_LABEL ? '' : preferences.otherPreferences,
    });
    setIsEditing(true);
  }, [preferences]);

  const cancelEdit = useCallback(() => {
    setDraft(preferences);
    setIsEditing(false);
  }, [preferences]);

  const saveEdit = useCallback(() => {
    const next: RoleAlertPreferences = {
      roleType: draft.roleType.trim() || preferences.roleType,
      experienceLevel: draft.experienceLevel.trim() || preferences.experienceLevel,
      location: draft.location.trim() || preferences.location,
      salaryExpectation: draft.salaryExpectation.trim() || preferences.salaryExpectation,
      otherPreferences: draft.otherPreferences.trim() || EMPTY_OTHER_LABEL,
    };

    setPreferences(next);
    setDraft(next);
    setIsEditing(false);
    setAlertSet(false);
    toast.success('Preferences updated. VORA will now match against your new profile.', {
      duration: 4000,
    });
  }, [draft, preferences]);

  const setAlert = useCallback(() => {
    setAlertSet(true);
    toast.success('Alert set, we will notify you the moment your role goes live.', {
      duration: 4000,
    });
  }, []);

  const updateDraftField = useCallback(
    (field: keyof RoleAlertPreferences, value: string) => {
      setDraft((prev: RoleAlertPreferences) => ({ ...prev, [field]: value }));
    },
    [],
  );

  return {
    preferences,
    draft,
    isEditing,
    alertSet,
    startEdit,
    cancelEdit,
    saveEdit,
    setAlert,
    updateDraftField,
  };
};
