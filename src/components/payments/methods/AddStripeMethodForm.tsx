import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import AlertBanner from '../../common/AlertBanner';
import Input from '../../common/Input';
import Select from '../../common/Select';
import SetAsDefaultCheckbox from './SetAsDefaultCheckbox';
import FormFieldShell, { formControlClass } from './FormFieldShell';
import { STRIPE_BILLING_COUNTRIES } from '../../../constants/topUpWallet';
import { formatCardExpiry, formatCardNumber } from '../../../utils/topUpWallet';
import { validateStripeCardForm } from '../../../utils/paymentFormValidation';
import { useValidatedForm } from '../../../hooks/useValidatedForm';
import type { PaymentMethodFormHandle } from '../../../types/paymentForm';
import {
  PAYMENT_METHOD_FORM_FIELDS_CLASS,
} from './paymentMethodFormStyles';

const INITIAL = {
  cardholderName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
  country: '',
};

const AddStripeMethodForm = forwardRef<PaymentMethodFormHandle>((_, ref) => {
  const [setAsDefault, setSetAsDefault] = useState(true);
  const validate = useCallback((values: typeof INITIAL) => validateStripeCardForm(values), []);
  const form = useValidatedForm(INITIAL, validate);

  useImperativeHandle(
    ref,
    () => ({
      validate: () => form.validateAll(),
      reset: () => {
        form.reset();
        setSetAsDefault(true);
      },
    }),
    [form],
  );

  return (
    <div>
      <AlertBanner variant="blue" className="!text-xs mb-5">
        <strong>Stripe</strong>, recommended for UK, EU, US and Canada. Card data is encrypted and
        tokenised, never stored on VORA servers.
        <p className="mt-1.5 text-[11px] opacity-90">Best for: Global North employers · Instant settlement</p>
      </AlertBanner>

      <div className={PAYMENT_METHOD_FORM_FIELDS_CLASS}>
        <Input
          label="Cardholder Name"
          placeholder="As it appears on your card"
          value={form.values.cardholderName}
          onChange={(e) => form.setField('cardholderName', e.target.value)}
          onBlur={() => form.markTouched('cardholderName')}
          error={form.fieldError('cardholderName')}
          helperText={form.showError('cardholderName')}
        />
        <FormFieldShell
          label="Card Number"
          error={form.fieldError('cardNumber')}
          helperText={form.showError('cardNumber')}
        >
          <input
            type="text"
            value={form.values.cardNumber}
            maxLength={19}
            placeholder="1234 5678 9012 3456"
            onChange={(e) => form.setField('cardNumber', formatCardNumber(e.target.value))}
            onBlur={() => form.markTouched('cardNumber')}
            className={`${formControlClass(form.fieldError('cardNumber'))} tracking-wide`}
          />
        </FormFieldShell>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Input
            label="Expiry"
            placeholder="MM / YY"
            value={form.values.expiry}
            maxLength={7}
            onChange={(e) => form.setField('expiry', formatCardExpiry(e.target.value))}
            onBlur={() => form.markTouched('expiry')}
            error={form.fieldError('expiry')}
            helperText={form.showError('expiry')}
          />
          <Input
            label="CVC / CVV"
            placeholder="•••"
            maxLength={4}
            value={form.values.cvc}
            onChange={(e) => form.setField('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
            onBlur={() => form.markTouched('cvc')}
            error={form.fieldError('cvc')}
            helperText={form.showError('cvc')}
          />
        </div>
        <Select
          label="Billing Country"
          placeholder="Select country…"
          value={form.values.country}
          onChange={(e) => form.setField('country', e.target.value)}
          onBlur={() => form.markTouched('country')}
          options={STRIPE_BILLING_COUNTRIES.map((c) => ({ label: c, value: c }))}
          error={form.fieldError('country')}
          helperText={form.showError('country')}
        />
        <SetAsDefaultCheckbox checked={setAsDefault} onChange={setSetAsDefault} />
      </div>
    </div>
  );
});

AddStripeMethodForm.displayName = 'AddStripeMethodForm';

export default AddStripeMethodForm;
