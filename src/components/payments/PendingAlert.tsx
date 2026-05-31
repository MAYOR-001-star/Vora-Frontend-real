import React from 'react';
import AlertBanner from '../common/AlertBanner';
import Button from '../common/Button';

interface PendingAlertProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
}

const PendingAlert: React.FC<PendingAlertProps> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => (
  <AlertBanner variant="blue" className="mb-5 !items-center sm:!items-start">
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
      <div className="flex-1 min-w-0">
        <p className="font-semibold mb-0.5">{title}</p>
        <p>{description}</p>
      </div>
      <Button
        variant="primary"
        fullWidth={false}
        size="sm"
        pill={false}
        className="!min-h-0 !px-3.5 !py-1.5 !text-xs !rounded-lg font-semibold whitespace-nowrap shrink-0 self-start sm:self-center"
        onClick={onAction}
      >
        {actionLabel}
      </Button>
    </div>
  </AlertBanner>
);

export default PendingAlert;
