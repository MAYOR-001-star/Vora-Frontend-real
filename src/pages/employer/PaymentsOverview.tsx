import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import PaymentsPageHeader from '../../components/payments/PaymentsPageHeader';
import WalletTile from '../../components/payments/WalletTile';
import PendingAlert from '../../components/payments/PendingAlert';
import PaymentCard from '../../components/payments/PaymentCard';
import TransactionRow from '../../components/payments/TransactionRow';
import EscrowPositionRow from '../../components/payments/EscrowPositionRow';
import BalancePanel from '../../components/payments/BalancePanel';
import RateInfoCard from '../../components/payments/RateInfoCard';
import SpendCompositionCard from '../../components/payments/SpendCompositionCard';
import EscrowDetailModal from '../../components/payments/EscrowDetailModal';
import TrueUpModal from '../../components/payments/TrueUpModal';
import {
  WALLET_TILES,
  RECENT_TRANSACTIONS,
  ESCROW_POSITIONS,
  RATE_INFO_ROWS,
  ESCROW_COMPOSITION,
  ESCROW_DETAILS,
} from '../../constants/paymentsOverview';
import type { EscrowDetailData } from '../../types/paymentsOverview';

const PaymentsOverview: React.FC = () => {
  const navigate = useNavigate();
  const [escrowModalOpen, setEscrowModalOpen] = useState(false);
  const [escrowDetail, setEscrowDetail] = useState<EscrowDetailData | null>(null);
  const [trueUpOpen, setTrueUpOpen] = useState(false);

  const openEscrowDetail = (id: string) => {
    const data = ESCROW_DETAILS[id];
    if (data) {
      setEscrowDetail(data);
      setEscrowModalOpen(true);
    }
  };

  const handleWalletTile = (id: string) => {
    if (id === 'balance') {
      toast.success('Available balance: $3,240.00 — ready for escrow, true-ups, or withdrawal.');
    } else if (id === 'escrow') {
      openEscrowDetail('esc1');
    } else if (id === 'alignment') {
      navigate('/payments/alignment');
    }
  };

  return (
    <div className="w-full pb-10 animate-in fade-in duration-500">
      <PaymentsPageHeader
        title="Payments & Wallet"
        subtitle="Escrow & true-up engine · Midpoint commitment model · Global Health Employer · Audit-logged"
        onExport={() => toast.success('CSV exported')}
        onWithdraw={() => navigate('/payments/withdraw')}
        onTopUp={() => navigate('/payments/top-up')}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-7">
        {WALLET_TILES.map((tile) => (
          <WalletTile key={tile.id} {...tile} onClick={() => handleWalletTile(tile.id)} />
        ))}
      </div>

      <div className="mb-7 space-y-0">
        <PendingAlert
          title="True-up required: Global Health Research role confirmed at $75,000"
          description="Midpoint escrow was calculated on $70,000 (range $60k–$80k). Actual salary $75,000 means a $750 true-up is owed. Click to review & pay."
          actionLabel="Review True-Up"
          onAction={() => setTrueUpOpen(true)}
        />
        <PendingAlert
          title="2 alignment sessions awaiting your decision"
          description="Dr. Amara Osei and Priya Sharma. Hire to trigger full refund, or reject with documented reason."
          actionLabel="Review Now"
          onAction={() => navigate('/payments/alignment')}
        />
      </div>

      <div className="grid grid-cols-1 min-[1200px]:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start">
        <div className="min-w-0">
          <PaymentCard
            title="Recent Activity"
            headerAction={
              <Button
                variant="outline"
                fullWidth={false}
                size="sm"
                className="!min-h-[32px] !text-xs font-semibold border-[#387DFF] text-[#0047CC]"
                onClick={() => navigate('/payments/transactions')}
              >
                View all
              </Button>
            }
            bodyClassName="p-0"
          >
            {RECENT_TRANSACTIONS.map((tx) => (
              <TransactionRow
                key={tx.id}
                {...tx}
                onClick={() => {
                  if (tx.id === 'tx3') setTrueUpOpen(true);
                  else if (tx.id === 'tx5') navigate('/payments/alignment');
                  else toast('Transaction detail coming soon');
                }}
              />
            ))}
          </PaymentCard>

          <PaymentCard
            title="Active Escrow Positions"
            subtitle="Click any row for full escrow & true-up breakdown"
            bodyClassName="px-5 pb-4"
          >
            {ESCROW_POSITIONS.map((pos) => (
              <EscrowPositionRow key={pos.id} {...pos} onClick={() => openEscrowDetail(pos.id)} />
            ))}
          </PaymentCard>
        </div>

        <div className="min-[1200px]:sticky min-[1200px]:top-5 min-w-0">
          <BalancePanel
            amount="$3,240.00"
            subtitle="Global Health Employer · USD"
            onTopUp={() => navigate('/payments/top-up')}
            onWithdraw={() => navigate('/payments/withdraw')}
          />
          <RateInfoCard rows={RATE_INFO_ROWS} />
          <SpendCompositionCard items={ESCROW_COMPOSITION} />
          <Button
            variant="primary"
            fullWidth
            size="md"
            className="font-semibold"
            onClick={() => navigate('/payments/methods')}
          >
            Manage Payment Methods
          </Button>
        </div>
      </div>

      <EscrowDetailModal
        open={escrowModalOpen}
        data={escrowDetail}
        onClose={() => setEscrowModalOpen(false)}
      />
      <TrueUpModal open={trueUpOpen} onClose={() => setTrueUpOpen(false)} />
    </div>
  );
};

export default PaymentsOverview;
