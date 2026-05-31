import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AlertBanner from '../../components/common/AlertBanner';
import { PageTitle, SectionDescription } from '../../components/common/Typography';
import PaymentCard from '../../components/payments/PaymentCard';
import PaymentsBreadcrumb from '../../components/payments/PaymentsBreadcrumb';
import PaymentMethodTabs from '../../components/payments/PaymentMethodTabs';
import TopUpSummaryPanel from '../../components/payments/TopUpSummaryPanel';
import WalletSnapshotCard from '../../components/payments/WalletSnapshotCard';
import EscrowTrueUpInfoCard from '../../components/payments/EscrowTrueUpInfoCard';
import TopUpSuccessModal from '../../components/payments/TopUpSuccessModal';
import StripeTopUpPanel from '../../components/payments/topup/StripeTopUpPanel';
import PaystackTopUpPanel from '../../components/payments/topup/PaystackTopUpPanel';
import FlutterwaveTopUpPanel from '../../components/payments/topup/FlutterwaveTopUpPanel';
import BankTransferTopUpPanel from '../../components/payments/topup/BankTransferTopUpPanel';
import {
  PROCESSOR_LABELS,
  TOP_UP_METHOD_TABS,
  TOP_UP_PRESET_VALUES,
  WALLET_CURRENT_BALANCE,
  WALLET_SNAPSHOT_ROWS,
} from '../../constants/topUpWallet';
import type { TopUpPaymentMethod } from '../../types/topUpWallet';
import { calculateCardProcessingFee } from '../../utils/topUpWallet';

const PaymentsTopUp: React.FC = () => {
  const [method, setMethod] = useState<TopUpPaymentMethod>('stripe');
  const [amount, setAmount] = useState('');
  const [activePreset, setActivePreset] = useState<number | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);

  const numericAmount = parseFloat(amount) || 0;
  const fee = method === 'bank' ? 0 : calculateCardProcessingFee(numericAmount);
  const total = numericAmount + fee;
  const afterBalance = WALLET_CURRENT_BALANCE + numericAmount;

  const minAmount = useMemo(() => (method === 'bank' ? 50 : 10), [method]);

  const handlePresetSelect = (preset: number) => {
    setAmount(String(preset));
    setActivePreset(preset);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const parsed = parseFloat(value);
    setActivePreset(Number.isFinite(parsed) && TOP_UP_PRESET_VALUES.has(parsed) ? parsed : null);
  };

  const handleSubmit = () => {
    if (numericAmount < minAmount) {
      toast.error(`Minimum top-up is $${minAmount.toFixed(2)}`);
      return;
    }
    setSuccessOpen(true);
  };

  const sharedPanelProps = {
    amount,
    onAmountChange: handleAmountChange,
    activePreset,
    onPresetSelect: handlePresetSelect,
    onSubmit: handleSubmit,
  };

  return (
    <div className="w-full pb-10 animate-in fade-in duration-500">
      <PaymentsBreadcrumb current="Top Up Wallet" className="mb-5" />

      <div className="mb-7">
        <PageTitle className="text-2xl tracking-tight">Top Up Wallet</PageTitle>
        <SectionDescription className="text-[13px] mt-1 max-w-2xl">
          Add funds to your VORA wallet to cover job postings, escrow, and alignment fees
        </SectionDescription>
      </div>

      <div className="grid grid-cols-1 min-[1000px]:grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
        <PaymentCard title="Select Payment Method" bodyClassName="px-5 pt-5 pb-6">
          <PaymentMethodTabs tabs={TOP_UP_METHOD_TABS} active={method} onChange={setMethod} />

          {method === 'stripe' && <StripeTopUpPanel {...sharedPanelProps} />}
          {method === 'paystack' && <PaystackTopUpPanel {...sharedPanelProps} />}
          {method === 'flutterwave' && <FlutterwaveTopUpPanel {...sharedPanelProps} />}
          {method === 'bank' && (
            <BankTransferTopUpPanel
              amount={amount}
              onAmountChange={handleAmountChange}
              activePreset={activePreset}
              onPresetSelect={handlePresetSelect}
            />
          )}
        </PaymentCard>

        <div className="min-[1000px]:sticky min-[1000px]:top-5 space-y-3.5">
          <TopUpSummaryPanel amount={numericAmount} fee={fee} total={total} />
          <WalletSnapshotCard rows={WALLET_SNAPSHOT_ROWS} afterTopUp={afterBalance} />
          <EscrowTrueUpInfoCard />
          <AlertBanner variant="blue" className="!text-xs">
            <strong>True-up pending:</strong> $750.00 owed for Global Health Research role. Top up your wallet
            and pay the true-up to release the offer letter.{' '}
            <Link to="/payments" className="text-[#0047CC] font-semibold hover:underline">
              Review now →
            </Link>
          </AlertBanner>
        </div>
      </div>

      <TopUpSuccessModal
        open={successOpen}
        amount={numericAmount}
        processor={PROCESSOR_LABELS[method]}
        onClose={() => setSuccessOpen(false)}
      />
    </div>
  );
};

export default PaymentsTopUp;
