import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import AlertBanner from '../../common/AlertBanner';
import Input from '../../common/Input';
import Select from '../../common/Select';
import FormFieldShell from './FormFieldShell';
import {
  PAYSTACK_CHANNELS,
  PAYSTACK_COUNTRIES,
  PAYSTACK_DIAL_CODES,
} from '../../../constants/topUpWallet';
import { validateGatewayMethodForm } from '../../../utils/paymentFormValidation';
import { useValidatedForm } from '../../../hooks/useValidatedForm';
import type { PaymentMethodFormHandle } from '../../../types/paymentForm';
import { PAYMENT_METHOD_FORM_FIELDS_CLASS } from './paymentMethodFormStyles';

const INITIAL = {
  country: '',
  email: '',
  phone: '',
  channel: PAYSTACK_CHANNELS[0],
};

const AddPaystackMethodForm = forwardRef<PaymentMethodFormHandle>((_, ref) => {
  const [dialCode, setDialCode] = useState(PAYSTACK_DIAL_CODES[0]);
  const validate = useCallback((values: typeof INITIAL) => validateGatewayMethodForm(values), []);
  const form = useValidatedForm(INITIAL, validate);

  useImperativeHandle(
    ref,
    () => ({
      validate: () => form.validateAll(),
      reset: () => {
        form.reset();
        setDialCode(PAYSTACK_DIAL_CODES[0]);
      },
    }),
    [form],
  );

  return (
    <div>
      <AlertBanner variant="blue" className="!text-xs mb-5">
        <strong>Paystack</strong> — best for Nigeria, Ghana, Kenya, Côte d&apos;Ivoire, Rwanda and South
        Africa. Supports cards, USSD, bank transfer, and mobile money.
        <p className="mt-1.5 text-[11px] opacity-90">
          Not available in Uganda, Tanzania, Zambia, Senegal, Cameroon — use Flutterwave for those.
        </p>
      </AlertBanner>

      <div className={PAYMENT_METHOD_FORM_FIELDS_CLASS}>
        <Select
          label="Country"
          placeholder="Select country…"
          value={form.values.country}
          onChange={(e) => form.setField('country', e.target.value)}
          onBlur={() => form.markTouched('country')}
          options={PAYSTACK_COUNTRIES.map((c) => ({ label: c, value: c }))}
          error={form.fieldError('country')}
          helperText={form.showError('country')}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          value={form.values.email}
          onChange={(e) => form.setField('email', e.target.value)}
          onBlur={() => form.markTouched('email')}
          error={form.fieldError('email')}
          helperText={form.showError('email') || 'Paystack sends receipts and verification to this address'}
        />
        <FormFieldShell
          label="Phone Number"
          error={form.fieldError('phone')}
          helperText={form.showError('phone')}
        >
          <div className="flex">
            <Select
              hideLabel
              variant="inline"
              value={dialCode}
              onChange={(e) => setDialCode(e.target.value)}
              options={PAYSTACK_DIAL_CODES.map((d) => ({ label: d, value: d }))}
              className="!w-[130px] shrink-0 [&_button]:!rounded-r-none [&_button]:!border-r-0"
            />
            <input
              type="tel"
              placeholder="080 0000 0000"
              value={form.values.phone}
              onChange={(e) => form.setField('phone', e.target.value)}
              onBlur={() => form.markTouched('phone')}
              className={`flex-1 min-w-0 px-4 py-3 rounded-r-lg border text-sm ${form.fieldError('phone') ? 'border-red-500 bg-red-50' : 'border-border-default bg-white'} focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue`}
            />
          </div>
        </FormFieldShell>
        <Select
          label="Preferred Channel"
          value={form.values.channel}
          onChange={(e) => form.setField('channel', e.target.value)}
          onBlur={() => form.markTouched('channel')}
          options={PAYSTACK_CHANNELS.map((c) => ({ label: c, value: c }))}
          error={form.fieldError('channel')}
          helperText={form.showError('channel')}
        />
      </div>
    </div>
  );
});

AddPaystackMethodForm.displayName = 'AddPaystackMethodForm';

export default AddPaystackMethodForm;
