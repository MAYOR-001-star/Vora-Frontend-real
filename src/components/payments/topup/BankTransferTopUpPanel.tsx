import React from 'react';
import toast from 'react-hot-toast';
import AlertBanner from '../../common/AlertBanner';
import Button from '../../common/Button';
import BankAccountDetailsCard from '../BankAccountDetailsCard';
import TopUpAmountField from '../TopUpAmountField';
import { BANK_ACCOUNT_DETAILS } from '../../../constants/topUpWallet';

interface BankTransferTopUpPanelProps {
  amount: string;
  onAmountChange: (value: string) => void;
  activePreset: number | null;
  onPresetSelect: (amount: number) => void;
}

const BankTransferTopUpPanel: React.FC<BankTransferTopUpPanelProps> = ({
  amount,
  onAmountChange,
  activePreset,
  onPresetSelect,
}) => (
  <div>
    <AlertBanner variant="blue" className="!text-xs mb-5">
      Transfer directly from your bank. Funds appear within 1–3 business days. No processing fees on bank
      transfers.
    </AlertBanner>

    <TopUpAmountField
      label="Amount to Transfer"
      value={amount}
      onChange={onAmountChange}
      presets={[]}
      activePreset={activePreset}
      onPresetSelect={onPresetSelect}
      min={50}
    />

    <BankAccountDetailsCard rows={BANK_ACCOUNT_DETAILS} />

    <AlertBanner variant="blue" className="!text-xs mb-4">
      <strong>Important:</strong> Always include your reference code{' '}
      <strong>VORA-EN-20250001</strong> in the transfer description so we can match your payment
      automatically.
    </AlertBanner>

    <Button
      variant="primary"
      pill={false}
      className="!rounded-lg !text-sm mt-2"
      onClick={() => toast.success('Transfer noted. Funds will appear within 1–3 business days.')}
    >
      I&apos;ve Made the Transfer
    </Button>
  </div>
);

export default BankTransferTopUpPanel;
