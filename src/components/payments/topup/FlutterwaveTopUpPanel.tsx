import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AlertBanner from '../../common/AlertBanner';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Select from '../../common/Select';
import TopUpAmountField from '../TopUpAmountField';
import TopUpSecurityNote from '../TopUpSecurityNote';
import FormFieldShell from '../methods/FormFieldShell';
import {
  FLUTTERWAVE_CHANNELS_BY_COUNTRY,
  FLUTTERWAVE_COUNTRY_GROUPS,
  FLUTTERWAVE_DIAL_CODES,
  FLUTTERWAVE_DEFAULT_CHANNELS,
  TOP_UP_AMOUNT_PRESETS_SHORT,
} from '../../../constants/topUpWallet';
import { validateGatewayMethodForm } from '../../../utils/paymentFormValidation';
import { useValidatedForm } from '../../../hooks/useValidatedForm';

interface FlutterwaveTopUpPanelProps {
  amount: string;
  onAmountChange: (value: string) => void;
  activePreset: number | null;
  onPresetSelect: (amount: number) => void;
  onSubmit: () => void;
}

const INITIAL = {
  country: '',
  email: '',
  phone: '',
  channel: FLUTTERWAVE_DEFAULT_CHANNELS[0],
};

const FlutterwaveTopUpPanel: React.FC<FlutterwaveTopUpPanelProps> = ({
  amount,
  onAmountChange,
  activePreset,
  onPresetSelect,
  onSubmit,
}) => {
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
  }, [form.values.country, form.setField]);

  const handleContinue = () => {
    if (!form.validateAll()) {
      toast.error('Please complete all required fields correctly.');
      return;
    }
    onSubmit();
  };

  return (
    <div>
      <AlertBanner variant="blue" className="!text-xs mb-5">
        <strong>Flutterwave</strong> — recommended for Uganda, Tanzania, Zambia, Senegal and Cameroon. Also
        works in Kenya, Ghana, Nigeria and 30+ African countries.
        <p className="mt-1 text-[11px] opacity-90">
          M-Pesa · MTN MoMo · Airtel Money · Cards · Bank Transfer · 150+ currencies
        </p>
      </AlertBanner>

      <TopUpAmountField
        value={amount}
        onChange={onAmountChange}
        presets={TOP_UP_AMOUNT_PRESETS_SHORT}
        activePreset={activePreset}
        onPresetSelect={onPresetSelect}
      />

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
        helperText={form.showError('email') || 'Flutterwave sends a receipt to this address'}
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
            className={`flex-1 min-w-0 px-4 py-3 rounded-r-lg border text-sm ${form.fieldError('phone') ? 'border-red-500 bg-red-50' : 'border-border-default bg-white'} focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue`}
          />
        </div>
      </FormFieldShell>

      <Select
        label="Payment Channel"
        value={form.values.channel}
        onChange={(e) => form.setField('channel', e.target.value)}
        onBlur={() => form.markTouched('channel')}
        options={channels.map((c) => ({ label: c, value: c }))}
        error={form.fieldError('channel')}
        helperText={form.showError('channel')}
      />

      <Button variant="primary" pill={false} className="!rounded-lg !text-sm" onClick={handleContinue}>
        Continue with Flutterwave
      </Button>
      <TopUpSecurityNote>Secured by Flutterwave · 30+ African countries · 150+ currencies</TopUpSecurityNote>
    </div>
  );
};

export default FlutterwaveTopUpPanel;
