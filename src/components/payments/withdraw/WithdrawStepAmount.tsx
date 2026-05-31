import React from 'react';
import Button from '../../common/Button';
import TopUpAmountField from '../TopUpAmountField';
import WithdrawMethodCard from '../WithdrawMethodCard';
import {
  MIN_WITHDRAW_AMOUNT,
  WITHDRAW_AMOUNT_PRESETS,
  WITHDRAW_METHODS,
} from '../../../constants/withdrawWallet';
import { WALLET_CURRENT_BALANCE } from '../../../constants/topUpWallet';
import { formatUsd } from '../../../utils/topUpWallet';
import type { WithdrawMethod } from '../../../types/withdrawWallet';

interface WithdrawStepAmountProps {
  amount: string;
  method: WithdrawMethod;
  activePreset: number | null;
  onAmountChange: (value: string) => void;
  onPresetSelect: (preset: number) => void;
  onMethodSelect: (method: WithdrawMethod) => void;
  onContinue: () => void;
}

const WithdrawStepAmount: React.FC<WithdrawStepAmountProps> = ({
  amount,
  method,
  activePreset,
  onAmountChange,
  onPresetSelect,
  onMethodSelect,
  onContinue,
}) => (
  <>
    <TopUpAmountField
      label="Amount to Withdraw"
      value={amount}
      onChange={onAmountChange}
      presets={WITHDRAW_AMOUNT_PRESETS}
      activePreset={activePreset}
      onPresetSelect={onPresetSelect}
      min={MIN_WITHDRAW_AMOUNT}
      formatPresetLabel={(preset) =>
        preset === WALLET_CURRENT_BALANCE ? `All (${formatUsd(preset)})` : formatUsd(preset)
      }
      hint={
        <>
          Available: <strong>{formatUsd(WALLET_CURRENT_BALANCE)}</strong> · Minimum withdrawal:{' '}
          {formatUsd(MIN_WITHDRAW_AMOUNT)}
        </>
      }
    />

    <div className="mb-[18px]">
      <label className="block text-sm font-medium text-text-secondary mb-2.5">
        Withdrawal Method
      </label>
      {WITHDRAW_METHODS.map((opt) => (
        <WithdrawMethodCard
          key={opt.id}
          id={opt.id}
          name={opt.name}
          subtitle={opt.subtitle}
          selected={method === opt.id}
          onSelect={onMethodSelect}
        />
      ))}
    </div>

    <Button variant="primary" pill={false} className="!rounded-lg gap-2" onClick={onContinue}>
      Continue
    </Button>
  </>
);

export default WithdrawStepAmount;
