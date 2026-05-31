import { useCallback, useMemo, useState } from 'react';
import type { FieldErrors } from '../utils/paymentFormValidation';
import { hasFieldErrors, touchAllFields } from '../utils/paymentFormValidation';

export function useValidatedForm<T extends Record<string, string>>(
  initialValues: T,
  validate: (values: T) => FieldErrors<keyof T & string>,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => validate(values), [validate, values]);

  const setField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const markTouched = useCallback((field: keyof T) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const showError = useCallback(
    (field: keyof T): string => {
      const message = errors[field as keyof T & string];
      if (!message) return '';
      return touched[field] || submitted ? message : '';
    },
    [errors, touched, submitted],
  );

  const fieldError = useCallback(
    (field: keyof T) => Boolean(showError(field)),
    [showError],
  );

  const validateAll = useCallback((): boolean => {
    setSubmitted(true);
    setTouched(
      touchAllFields(Object.keys(values) as (keyof T & string)[]) as Partial<Record<keyof T, boolean>>,
    );
    return !hasFieldErrors(validate(values));
  }, [validate, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setTouched({});
    setSubmitted(false);
  }, [initialValues]);

  return {
    values,
    setValues,
    setField,
    touched,
    markTouched,
    errors,
    showError,
    fieldError,
    validateAll,
    reset,
    submitted,
  };
}
