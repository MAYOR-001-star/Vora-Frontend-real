import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import AlertBanner from '../../common/AlertBanner';
import Input from '../../common/Input';
import Select from '../../common/Select';
import {
  FLUTTERWAVE_CHANNELS_BY_COUNTRY,
  FLUTTERWAVE_COUNTRY_GROUPS,
  FLUTTERWAVE_DIAL_CODES,
  FLUTTERWAVE_DEFAULT_CHANNELS,
} from '../../../constants/topUpWallet';
import { validateGatewayMethodForm } from '../../../utils/paymentFormValidation';
import { useValidatedForm } from '../../../hooks/useValidatedForm';
import type { PaymentMethodFormHandle } from '../../../types/paymentForm';
import FormFieldShell from './FormFieldShell';
import { PAYMENT_METHOD_FORM_FIELDS_CLASS } from './paymentMethodFormStyles';

const INITIAL = {
  country: '',
  email: '',
  phone: '',
  channel: FLUTTERWAVE_DEFAULT_CHANNELS[0],
};

const AddFlutterwaveMethodForm = forwardRef<PaymentMethodFormHandle>((_, ref) => {
  const [dialCode, setDialCode] = useState(FLUTTERWAVE_DIAL_CODES[0]);
  const [channels, setChannels] = useState(FLUTTERWAVE_DEFAULT_CHANNELS);
  const validate = useCallback((values: typeof INITIAL) => validateGatewayMethodForm(values), []);
  const form = useValidatedForm(INITIAL, validate);

  useEffect(() => {
    if (form.values.country && FLUTTERWAVE_CHANNELS_BY_COUNTRY[form.values.country]) {
      const next = FLUTTERWAVE_CHANNELS_BY_COUNTRY[form.values.country];
      setChannels(next);
      form.setField('channel', next[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- channel list follows country only
  }, [form.values.country]);

  useImperativeHandle(
    ref,
    () => ({
      validate: () => form.validateAll(),
      reset: () => {
        form.reset();
        setDialCode(FLUTTERWAVE_DIAL_CODES[0]);
        setChannels(FLUTTERWAVE_DEFAULT_CHANNELS);
      },
    }),
    [form],
  );

  return (
    <div>
      <AlertBanner variant="blue" className="!text-xs mb-5">
        <strong>Flutterwave</strong>, recommended for East Africa (Uganda, Tanzania, Zambia) and broader
        West Africa (Senegal, Cameroon). Also available in Kenya, Ghana, Nigeria and 30+ African countries.
        <p className="mt-1.5 text-[11px] opacity-90">
          Supports M-Pesa, MTN MoMo, Airtel Money, cards, and bank transfers across 150+ currencies.
        </p>
      </AlertBanner>

      <div className={PAYMENT_METHOD_FORM_FIELDS_CLASS}>
        <Select
          label="Country"
          placeholder="Select country…"
          value={form.values.country}
          onChange={(e) => form.setField('country', e.target.value)}
          onBlur={() => form.markTouched('country')}
          groups={FLUTTERWAVE_COUNTRY_GROUPS}
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
          helperText={form.showError('email') || 'Flutterwave sends receipts to this address'}
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
              options={FLUTTERWAVE_DIAL_CODES.map((d) => ({ label: d, value: d }))}
              className="!w-[140px] shrink-0 [&_button]:!rounded-r-none [&_button]:!border-r-0"
            />
            <input
              type="tel"
              placeholder="0712 345 678"
              value={form.values.phone}
              onChange={(e) => form.setField('phone', e.target.value)}
              onBlur={() => form.markTouched('phone')}
              className={`flex-1 min-w-0 px-4 py-3 rounded-r-lg border text-sm ${form.fieldError('phone') ? 'border-red-500 bg-white' : 'border-border-default bg-white'} focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue`}
            />
          </div>
        </FormFieldShell>
        <Select
          label="Preferred Channel"
          value={form.values.channel}
          onChange={(e) => form.setField('channel', e.target.value)}
          onBlur={() => form.markTouched('channel')}
          options={channels.map((c) => ({ label: c, value: c }))}
          error={form.fieldError('channel')}
          helperText={form.showError('channel')}
        />
      </div>
    </div>
  );
});

AddFlutterwaveMethodForm.displayName = 'AddFlutterwaveMethodForm';

export default AddFlutterwaveMethodForm;
