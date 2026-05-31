import React from 'react';
import Button from '../../common/Button';
import Tag from '../../common/Tag';
import PaymentMethodLogo from './PaymentMethodLogo';
import type { SavedMethodBadgeVariant, SavedPaymentMethod } from '../../../types/paymentMethods';

const BADGE_VARIANT: Record<SavedMethodBadgeVariant, 'blue' | 'green' | 'purple'> = {
  default: 'blue',
  active: 'green',
  manual: 'purple',
};

interface SavedPaymentMethodCardProps {
  method: SavedPaymentMethod;
  onSetDefault: (id: string) => void;
  onRemove: (id: string, name: string) => void;
}

const SavedPaymentMethodCard: React.FC<SavedPaymentMethodCardProps> = ({
  method,
  onSetDefault,
  onRemove,
}) => {
  if (method.removed) {
    return (
      <div
        className="opacity-30 pointer-events-none bg-white border border-[#E6E6E6] rounded-xl px-5 py-[18px] flex items-center gap-4 mb-3"
        aria-hidden
      >
        <PaymentMethodLogo type={method.type} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#1A1A1A]">{method.name}</p>
          <p className="text-xs text-[#808080]">{method.detail}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white border rounded-xl px-5 py-[18px] flex flex-wrap sm:flex-nowrap items-center gap-4 mb-3 ${
        method.isDefault ? 'border-[#0047CC]' : 'border-[#E6E6E6]'
      }`}
    >
      <PaymentMethodLogo type={method.type} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#1A1A1A] mb-0.5">{method.name}</p>
        <p className="text-xs text-[#808080]">{method.detail}</p>
        <Tag
          label={method.isDefault ? 'Default' : method.badge.label}
          variant={method.isDefault ? 'blue' : BADGE_VARIANT[method.badge.variant]}
          className="!text-[10px] !py-0.5 !px-2 !mt-1 !rounded-[10px]"
        />
      </div>
      <div className="flex gap-1.5 shrink-0 w-full sm:w-auto justify-end">
        <Button
          variant="outline"
          size="sm"
          pill={false}
          fullWidth={false}
          className="!text-xs !font-semibold !rounded-lg !px-3.5 !py-1.5"
          onClick={() => !method.isDefault && onSetDefault(method.id)}
          disabled={method.isDefault}
        >
          {method.isDefault ? 'Default' : 'Set Default'}
        </Button>
        <Button
          variant="primary"
          size="sm"
          pill={false}
          fullWidth={false}
          className="!text-xs !font-semibold !rounded-lg !px-3.5 !py-1.5 !bg-[#DC2626] hover:!bg-[#B91C1C]"
          onClick={() => onRemove(method.id, method.name)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default SavedPaymentMethodCard;
