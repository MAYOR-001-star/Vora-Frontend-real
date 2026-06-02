import { forwardRef, useCallback, useImperativeHandle } from 'react';
import AlertBanner from '../../common/AlertBanner';
import Input from '../../common/Input';
import Select from '../../common/Select';
import { BANK_METHOD_COUNTRIES } from '../../../constants/paymentMethods';
import { validateBankMethodForm } from '../../../utils/paymentFormValidation';
import { useValidatedForm } from '../../../hooks/useValidatedForm';
import type { PaymentMethodFormHandle } from '../../../types/paymentForm';
import { PAYMENT_METHOD_FORM_FIELDS_CLASS } from './paymentMethodFormStyles';

const INITIAL = {
  accountHolderName: '',
  bankName: '',
  accountNumber: '',
  sortCode: '',
  swiftBic: '',
  country: BANK_METHOD_COUNTRIES[0],
};

const AddBankMethodForm = forwardRef<PaymentMethodFormHandle>((_, ref) => {
  const validate = useCallback((values: typeof INITIAL) => validateBankMethodForm(values), []);
  const form = useValidatedForm(INITIAL, validate);

  useImperativeHandle(
    ref,
    () => ({
      validate: () => form.validateAll(),
      reset: form.reset,
    }),
    [form],
  );

  return (
    <div>
      <AlertBanner variant="blue" className="!text-xs mb-5">
        Bank transfers have <strong>no processing fee</strong> and work from any bank globally. Funds arrive
        in 1,3 business days.
      </AlertBanner>

      <div className={PAYMENT_METHOD_FORM_FIELDS_CLASS}>
        <Input
          label="Account Holder Name"
          placeholder="Full name on bank account"
          value={form.values.accountHolderName}
          onChange={(e) => form.setField('accountHolderName', e.target.value)}
          onBlur={() => form.markTouched('accountHolderName')}
          error={form.fieldError('accountHolderName')}
          helperText={form.showError('accountHolderName')}
        />
        <Input
          label="Bank Name"
          placeholder="e.g. GTBank, Barclays, Chase"
          value={form.values.bankName}
          onChange={(e) => form.setField('bankName', e.target.value)}
          onBlur={() => form.markTouched('bankName')}
          error={form.fieldError('bankName')}
          helperText={form.showError('bankName')}
        />
        <Input
          label="Account Number / IBAN"
          placeholder="e.g. GB29NWBK60161331926819"
          value={form.values.accountNumber}
          onChange={(e) => form.setField('accountNumber', e.target.value)}
          onBlur={() => form.markTouched('accountNumber')}
          error={form.fieldError('accountNumber')}
          helperText={form.showError('accountNumber')}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Input
            label="Sort Code / ABA"
            placeholder="00-00-00"
            value={form.values.sortCode}
            onChange={(e) => form.setField('sortCode', e.target.value)}
            onBlur={() => form.markTouched('sortCode')}
            error={form.fieldError('sortCode')}
            helperText={form.showError('sortCode')}
          />
          <Input
            label="SWIFT / BIC"
            placeholder="e.g. GTBINGLAXXX"
            value={form.values.swiftBic}
            onChange={(e) => form.setField('swiftBic', e.target.value.toUpperCase())}
            onBlur={() => form.markTouched('swiftBic')}
            error={form.fieldError('swiftBic')}
            helperText={form.showError('swiftBic')}
          />
        </div>
        <Select
          label="Bank Country"
          value={form.values.country}
          onChange={(e) => form.setField('country', e.target.value)}
          onBlur={() => form.markTouched('country')}
          options={BANK_METHOD_COUNTRIES.map((c) => ({ label: c, value: c }))}
          error={form.fieldError('country')}
          helperText={form.showError('country')}
        />
      </div>
    </div>
  );
});

AddBankMethodForm.displayName = 'AddBankMethodForm';

export default AddBankMethodForm;
