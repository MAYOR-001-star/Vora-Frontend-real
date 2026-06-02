import React from 'react';
import PaymentCard from '../PaymentCard';
import { PhoneIcon, PaperPlaneIcon, BankIcon, CreditCardIcon } from '../../common/Icons';
import { SUPPORTED_GATEWAYS } from '../../../constants/paymentMethods';

const GatewayIcon: React.FC<{ id: string; stroke: string }> = ({ id, stroke }) => {
  if (id === 'paystack') return <PhoneIcon size={16} stroke={stroke} aria-hidden />;
  if (id === 'flutterwave') return <PaperPlaneIcon size={16} stroke={stroke} aria-hidden />;
  if (id === 'bank') return <BankIcon size={16} stroke={stroke} aria-hidden />;
  return <CreditCardIcon size={16} stroke={stroke} aria-hidden />;
};

const SupportedGatewaysCard: React.FC = () => (
  <PaymentCard title="Supported Gateways" className="!mb-3.5" bodyClassName="px-5 py-4">
    {SUPPORTED_GATEWAYS.map((gw, i) => (
      <div
        key={gw.id}
        className={`flex items-start gap-3 py-2.5 ${i < SUPPORTED_GATEWAYS.length - 1 ? 'border-b border-[#F7F7F7]' : ''}`}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: gw.iconBg }}
        >
          <GatewayIcon id={gw.id} stroke={gw.iconStroke} />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-[#1A1A1A]">{gw.title}</p>
          <p className="text-[11px] text-[#808080]">{gw.description}</p>
          <p className="text-[10px] text-[#ADADAD] mt-0.5">{gw.regions}</p>
        </div>
      </div>
    ))}
  </PaymentCard>
);

export default SupportedGatewaysCard;
