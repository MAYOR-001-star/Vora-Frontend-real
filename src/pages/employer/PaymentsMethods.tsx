import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import { PageTitle, SectionDescription } from '../../components/common/Typography';
import PaymentsBreadcrumb from '../../components/payments/PaymentsBreadcrumb';
import AddPaymentMethodModal from '../../components/payments/methods/AddPaymentMethodModal';
import RemovePaymentMethodModal from '../../components/payments/methods/RemovePaymentMethodModal';
import SavedPaymentMethodCard from '../../components/payments/methods/SavedPaymentMethodCard';
import SupportedGatewaysCard from '../../components/payments/methods/SupportedGatewaysCard';
import LocationRoutingCard from '../../components/payments/methods/LocationRoutingCard';
import {
  INITIAL_SAVED_PAYMENT_METHODS,
  PAYMENT_SECURITY_NOTE,
} from '../../constants/paymentMethods';
import type { SavedPaymentMethod } from '../../types/paymentMethods';

const PaymentsMethods: React.FC = () => {
  const [methods, setMethods] = useState<SavedPaymentMethod[]>(INITIAL_SAVED_PAYMENT_METHODS);
  const [addOpen, setAddOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<{ id: string; name: string } | null>(null);

  const handleSetDefault = useCallback((id: string) => {
    setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
    toast.success('Default payment method updated.');
  }, []);

  const handleRemoveRequest = useCallback((id: string, name: string) => {
    setRemoveTarget({ id, name });
  }, []);

  const handleRemoveConfirm = useCallback(() => {
    if (!removeTarget) return;
    setMethods((prev) =>
      prev.map((m) => (m.id === removeTarget.id ? { ...m, removed: true } : m)),
    );
    setRemoveTarget(null);
    toast('Payment method removed.');
  }, [removeTarget]);

  const handleSaveMethod = useCallback(() => {
    setAddOpen(false);
    toast.success('Payment method saved successfully!');
  }, []);

  const visibleMethods = methods.filter((m) => !m.removed);

  return (
    <div className="max-w-[1200px]">
      <PaymentsBreadcrumb current="Payment Methods" className="mb-5" />

      <div className="flex flex-wrap items-start justify-between gap-4 mb-7">
        <div>
          <PageTitle className="!text-2xl !font-bold tracking-tight">Payment Methods</PageTitle>
          <SectionDescription className="mt-1">
            Manage how you fund your VORA wallet, cards, African payment gateways, and bank transfers
          </SectionDescription>
        </div>
        <Button
          variant="primary"
          size="md"
          pill={false}
          fullWidth={false}
          className="!rounded-lg !text-[13px] gap-1.5 shrink-0"
          onClick={() => setAddOpen(true)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Payment Method
        </Button>
      </div>

      <div className="grid grid-cols-1 min-[1000px]:grid-cols-[1fr_340px] gap-6 items-start">
        <div>
          <p className="text-[13px] font-semibold text-[#1A1A1A] mb-3">Saved Methods</p>
          {methods.map((method) => (
            <SavedPaymentMethodCard
              key={method.id}
              method={method}
              onSetDefault={handleSetDefault}
              onRemove={handleRemoveRequest}
            />
          ))}

          {visibleMethods.length === 0 && (
            <p className="text-sm text-[#808080] py-8 text-center border border-dashed border-[#E6E6E6] rounded-xl">
              No payment methods saved yet.
            </p>
          )}

          <div className="mt-5 pt-5 border-t border-[#E6E6E6]">
            <p className="text-[13px] font-semibold text-[#1A1A1A] mb-1">Payment Security</p>
            <p className="text-xs text-[#808080] leading-relaxed">{PAYMENT_SECURITY_NOTE}</p>
          </div>
        </div>

        <div className="min-w-0">
          <SupportedGatewaysCard />
          <LocationRoutingCard />
        </div>
      </div>

      <AddPaymentMethodModal open={addOpen} onClose={() => setAddOpen(false)} onSave={handleSaveMethod} />
      <RemovePaymentMethodModal
        open={!!removeTarget}
        methodName={removeTarget?.name ?? ''}
        onClose={() => setRemoveTarget(null)}
        onConfirm={handleRemoveConfirm}
      />
    </div>
  );
};

export default PaymentsMethods;
