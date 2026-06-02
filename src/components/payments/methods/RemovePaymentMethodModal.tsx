import React from 'react';
import Button from '../../common/Button';
import { TrashIcon } from '../../common/Icons';

interface RemovePaymentMethodModalProps {
  open: boolean;
  methodName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const RemovePaymentMethodModal: React.FC<RemovePaymentMethodModalProps> = ({
  open,
  methodName,
  onClose,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-[14px] w-full max-w-[400px] p-7 text-center"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="remove-method-title"
      >
        <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center mx-auto mb-4">
          <TrashIcon size={22} strokeWidth={2} className="text-[#DC2626]" aria-hidden />
        </div>
        <h2 id="remove-method-title" className="text-lg font-bold text-[#1A1A1A] mb-2">
          Remove Payment Method?
        </h2>
        <p className="text-[13px] text-[#808080] mb-6 leading-relaxed">
          Remove {methodName}? This will not affect active escrow or pending transactions.
        </p>
        <div className="flex gap-2.5 justify-center">
          <Button variant="outline" size="sm" pill={false} fullWidth={false} className="!rounded-lg" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            pill={false}
            fullWidth={false}
            className="!rounded-lg !bg-[#DC2626] hover:!bg-[#B91C1C]"
            onClick={onConfirm}
          >
            Yes, Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RemovePaymentMethodModal;
