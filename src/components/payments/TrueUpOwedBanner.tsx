import React from 'react';
import { Link } from 'react-router-dom';
import AlertBanner from '../common/AlertBanner';
import Button from '../common/Button';

interface TrueUpOwedBannerProps {
  amount?: string;
  roleName?: string;
  actionTo?: string;
  actionLabel?: string;
}

const TrueUpOwedBanner: React.FC<TrueUpOwedBannerProps> = ({
  amount = '$750.00',
  roleName = 'Global Health Research',
  actionTo = '/payments',
  actionLabel = 'Pay True-Up',
}) => (
  <AlertBanner variant="blue" className="!text-[13px] mb-5">
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
      <p className="flex-1 min-w-0 leading-relaxed">
        <strong>True-up owed: {amount}</strong> — {roleName} role confirmed at $75k. True-up must be
        settled before the offer letter is released. You can still withdraw from your available balance,
        but we recommend settling the true-up first.
      </p>
      <Link to={actionTo} className="shrink-0">
        <Button
          variant="primary"
          fullWidth={false}
          size="sm"
          pill={false}
          className="!min-h-0 !px-3.5 !py-1.5 !text-xs !rounded-lg font-semibold whitespace-nowrap"
        >
          {actionLabel}
        </Button>
      </Link>
    </div>
  </AlertBanner>
);

export default TrueUpOwedBanner;
