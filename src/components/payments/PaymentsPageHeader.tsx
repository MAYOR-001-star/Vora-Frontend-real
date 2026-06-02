import React from 'react';
import { PageTitle, SectionDescription } from '../common/Typography';
import Button from '../common/Button';

interface PaymentsPageHeaderProps {
  title: string;
  subtitle: string;
  onExport?: () => void;
  onWithdraw?: () => void;
  onTopUp?: () => void;
}

const PaymentsPageHeader: React.FC<PaymentsPageHeaderProps> = ({
  title,
  subtitle,
  onExport,
  onWithdraw,
  onTopUp,
}) => (
  <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
    <div>
      <PageTitle className="text-2xl tracking-tight">{title}</PageTitle>
      <SectionDescription className="text-[13px] mt-1">{subtitle}</SectionDescription>
    </div>
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        fullWidth={false}
        size="sm"
        className="!min-h-[36px] !text-xs font-semibold border-[#E6E6E6]"
        onClick={onExport}
      >
        Export
      </Button>
      <Button
        variant="outline"
        fullWidth={false}
        size="sm"
        className="!min-h-[36px] !text-xs font-semibold border-[#0047CC] text-[#0047CC] hover:bg-white"
        onClick={onWithdraw}
      >
        Withdraw
      </Button>
      <Button
        variant="primary"
        fullWidth={false}
        size="sm"
        className="!min-h-[36px] !text-xs font-semibold"
        onClick={onTopUp}
      >
        Top Up Wallet
      </Button>
    </div>
  </div>
);

export default PaymentsPageHeader;
