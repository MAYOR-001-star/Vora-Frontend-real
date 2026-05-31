import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import AlertBanner from '../../common/AlertBanner';
import Button from '../../common/Button';
import Input from '../../common/Input';
import Select from '../../common/Select';
import TopUpAmountField from '../TopUpAmountField';
import TopUpSecurityNote from '../TopUpSecurityNote';
import FormFieldShell from '../methods/FormFieldShell';
import {
  PAYSTACK_CHANNELS,
  PAYSTACK_COUNTRIES,
  PAYSTACK_DIAL_CODES,
  TOP_UP_AMOUNT_PRESETS_SHORT,
} from '../../../constants/topUpWallet';
import { validateGatewayMethodForm } from '../../../utils/paymentFormValidation';
import { useValidatedForm } from '../../../hooks/useValidatedForm';

interface PaystackTopUpPanelProps {
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
  channel: PAYSTACK_CHANNELS[0],
};

const PaystackTopUpPanel: React.FC<PaystackTopUpPanelProps> = ({
  amount,
  onAmountChange,
  activePreset,
  onPresetSelect,
  onSubmit,
}) => {
  const [dialCode, setDialCode] = useState(PAYSTACK_DIAL_CODES[0]);
  const validate = useCallback((values: typeof INITIAL) => validateGatewayMethodForm(values), []);
  const form = useValidatedForm(INITIAL, validate);

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
        <strong>Paystack</strong> — best for Nigeria, Ghana, Kenya, Côte d&apos;Ivoire, Rwanda and South
        Africa. Cards, USSD, bank transfer and mobile money.
        <p className="mt-1 text-[11px] opacity-90">
          Not available in Uganda, Tanzania, Zambia, Senegal or Cameroon — use the Flutterwave tab instead.
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
        helperText={form.showError('email') || 'Paystack will send a payment receipt to this address'}
      />

      <FormFieldShell
        label="Phone Number (for mobile money)"
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
        label="Payment Channel"
        value={form.values.channel}
        onChange={(e) => form.setField('channel', e.target.value)}
        onBlur={() => form.markTouched('channel')}
        options={PAYSTACK_CHANNELS.map((c) => ({ label: c, value: c }))}
        error={form.fieldError('channel')}
        helperText={form.showError('channel')}
      />

      <Button variant="primary" pill={false} className="!rounded-lg !text-sm" onClick={handleContinue}>
        Continue with Paystack
      </Button>
      <TopUpSecurityNote>
        Secured by Paystack · Nigeria · Ghana · Kenya · Côte d&apos;Ivoire · Rwanda · South Africa
      </TopUpSecurityNote>
    </div>
  );
};

export default PaystackTopUpPanel;
