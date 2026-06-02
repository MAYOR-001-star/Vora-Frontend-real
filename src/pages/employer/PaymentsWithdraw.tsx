import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import { PageTitle, SectionDescription } from '../../components/common/Typography';
import PaymentCard from '../../components/payments/PaymentCard';
import PaymentsBreadcrumb from '../../components/payments/PaymentsBreadcrumb';
import WizardStepIndicator from '../../components/payments/WizardStepIndicator';
import WithdrawSummaryPanel from '../../components/payments/WithdrawSummaryPanel';
import ProcessingTimeline from '../../components/payments/ProcessingTimeline';
import TrueUpOwedBanner from '../../components/payments/TrueUpOwedBanner';
import WithdrawSuccessModal from '../../components/payments/WithdrawSuccessModal';
import WithdrawStepAmount from '../../components/payments/withdraw/WithdrawStepAmount';
import WithdrawStepAccount from '../../components/payments/withdraw/WithdrawStepAccount';
import WithdrawStepConfirm from '../../components/payments/withdraw/WithdrawStepConfirm';
import {
  MIN_WITHDRAW_AMOUNT,
  WITHDRAW_PROCESSING_TIMELINE,
} from '../../constants/withdrawWallet';
import { WALLET_CURRENT_BALANCE } from '../../constants/topUpWallet';
import type { WithdrawMethod } from '../../types/withdrawWallet';

const PaymentsWithdraw: React.FC = () => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<WithdrawMethod>('bank');
  const [activePreset, setActivePreset] = useState<number | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);

  const numericAmount = parseFloat(amount) || 0;
  const remainingBalance = Math.max(0, WALLET_CURRENT_BALANCE - numericAmount);

  const handlePresetSelect = (preset: number) => {
    setAmount(String(preset));
    setActivePreset(preset);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const parsed = parseFloat(value);
    setActivePreset(
      Number.isFinite(parsed) && [100, 500, 1000, WALLET_CURRENT_BALANCE].includes(parsed)
        ? parsed
        : null,
    );
  };

  const goToStep = (next: number) => {
    if (next >= 2) {
      if (numericAmount < MIN_WITHDRAW_AMOUNT) {
        toast.error(`Minimum withdrawal is $${MIN_WITHDRAW_AMOUNT.toFixed(2)}`);
        return;
      }
      if (numericAmount > WALLET_CURRENT_BALANCE) {
        toast.error('Amount exceeds available balance');
        return;
      }
    }
    setStep(next);
  };

  const stepTitles = ['Step 1, Amount & Destination', 'Step 2, Account Details', 'Step 3, Review & Confirm'];

  return (
    <div className="w-full pb-10 animate-in fade-in duration-500">
      <PaymentsBreadcrumb current="Withdraw Funds" className="mb-5" />

      <div className="mb-7">
        <PageTitle className="text-2xl tracking-tight">Withdraw Funds</PageTitle>
        <SectionDescription className="text-[13px] mt-1 max-w-3xl">
          Transfer your available VORA wallet balance to your bank account or via Stripe · Min. $50 ·
          Cannot withdraw escrow-locked funds
        </SectionDescription>
      </div>

      <TrueUpOwedBanner />

      <div className="grid grid-cols-1 min-[1000px]:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
        <div>
          <WizardStepIndicator currentStep={step} />

          {step === 1 && (
            <PaymentCard title={stepTitles[0]} bodyClassName="px-5 py-5">
              <WithdrawStepAmount
                amount={amount}
                method={method}
                activePreset={activePreset}
                onAmountChange={handleAmountChange}
                onPresetSelect={handlePresetSelect}
                onMethodSelect={setMethod}
                onContinue={() => goToStep(2)}
              />
            </PaymentCard>
          )}

          {step === 2 && (
            <PaymentCard
              title={stepTitles[1]}
              headerAction={
                <Button variant="outline" fullWidth={false} size="sm" pill={false} onClick={() => goToStep(1)}>
                  Back
                </Button>
              }
              bodyClassName="px-5 py-5"
            >
              <WithdrawStepAccount method={method} onContinue={() => goToStep(3)} />
            </PaymentCard>
          )}

          {step === 3 && (
            <PaymentCard
              title={stepTitles[2]}
              headerAction={
                <Button variant="outline" fullWidth={false} size="sm" pill={false} onClick={() => goToStep(2)}>
                  Back
                </Button>
              }
              bodyClassName="px-5 py-5"
            >
              <WithdrawStepConfirm
                amount={numericAmount}
                method={method}
                onConfirm={() => setSuccessOpen(true)}
              />
            </PaymentCard>
          )}
        </div>

        <div className="min-[1000px]:sticky min-[1000px]:top-5 space-y-3.5">
          <WithdrawSummaryPanel
            amount={numericAmount}
            method={method}
            remainingBalance={remainingBalance}
          />
          <ProcessingTimeline steps={WITHDRAW_PROCESSING_TIMELINE} />
        </div>
      </div>

      <WithdrawSuccessModal
        open={successOpen}
        amount={numericAmount}
        onClose={() => setSuccessOpen(false)}
      />
    </div>
  );
};

export default PaymentsWithdraw;
