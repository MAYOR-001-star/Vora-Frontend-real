import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../common/Button';
import ScrollArea from '../../common/ScrollArea';
import { CloseIcon, CheckIcon } from '../../common/Icons';
import PaymentMethodTabs from '../PaymentMethodTabs';
import AddStripeMethodForm from './AddStripeMethodForm';
import AddPaystackMethodForm from './AddPaystackMethodForm';
import AddFlutterwaveMethodForm from './AddFlutterwaveMethodForm';
import AddBankMethodForm from './AddBankMethodForm';
import { TOP_UP_METHOD_TABS } from '../../../constants/topUpWallet';
import type { TopUpPaymentMethod } from '../../../types/topUpWallet';
import type { PaymentMethodFormHandle } from '../../../types/paymentForm';

interface AddPaymentMethodModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({ open, onClose, onSave }) => {
  const [method, setMethod] = useState<TopUpPaymentMethod>('stripe');
  const stripeRef = useRef<PaymentMethodFormHandle>(null);
  const paystackRef = useRef<PaymentMethodFormHandle>(null);
  const flutterwaveRef = useRef<PaymentMethodFormHandle>(null);
  const bankRef = useRef<PaymentMethodFormHandle>(null);

  const getActiveRef = (): PaymentMethodFormHandle | null => {
    switch (method) {
      case 'stripe':
        return stripeRef.current;
      case 'paystack':
        return paystackRef.current;
      case 'flutterwave':
        return flutterwaveRef.current;
      case 'bank':
        return bankRef.current;
      default:
        return null;
    }
  };

  const handleClose = () => {
    getActiveRef()?.reset();
    onClose();
  };

  const handleSave = () => {
    const active = getActiveRef();
    if (!active?.validate()) {
      toast.error('Please complete all required fields correctly.');
      return;
    }
    active.reset();
    onSave();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/50"
      onClick={handleClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-[14px] w-full max-w-[500px] max-h-[92vh] flex flex-col overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-method-title"
      >
        <div className="px-6 py-[18px] border-b border-[#E6E6E6] flex items-center justify-between shrink-0 sticky top-0 bg-white z-10 rounded-t-[14px]">
          <h2 id="add-method-title" className="text-base font-semibold text-[#1A1A1A]">
            Add Payment Method
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-[#808080] p-1 hover:text-[#1A1A1A] cursor-pointer bg-transparent border-none"
            aria-label="Close"
          >
            <CloseIcon size={18} strokeWidth={2} aria-hidden />
          </button>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="px-6 py-5">
            <PaymentMethodTabs tabs={TOP_UP_METHOD_TABS} active={method} onChange={setMethod} />
            {method === 'stripe' && <AddStripeMethodForm ref={stripeRef} />}
            {method === 'paystack' && <AddPaystackMethodForm ref={paystackRef} />}
            {method === 'flutterwave' && <AddFlutterwaveMethodForm ref={flutterwaveRef} />}
            {method === 'bank' && <AddBankMethodForm ref={bankRef} />}
          </div>
        </ScrollArea>

        <div className="px-6 py-3.5 border-t border-[#E6E6E6] flex justify-end gap-2.5 shrink-0 sticky bottom-0 bg-white rounded-b-[14px]">
          <Button variant="outline" size="sm" pill={false} fullWidth={false} className="!rounded-lg !text-sm" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" pill={false} fullWidth={false} className="!rounded-lg !text-sm gap-1.5" onClick={handleSave}>
            <CheckIcon size={14} strokeWidth={2.5} aria-hidden />
            Save Method
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentMethodModal;
