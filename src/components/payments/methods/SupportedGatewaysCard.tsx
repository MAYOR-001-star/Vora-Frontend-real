import React from 'react';
import PaymentCard from '../PaymentCard';
import { SUPPORTED_GATEWAYS } from '../../../constants/paymentMethods';

const GatewayIcon: React.FC<{ id: string; stroke: string }> = ({ id, stroke }) => {
  if (id === 'paystack') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" aria-hidden>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.09h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  }
  if (id === 'flutterwave') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" aria-hidden>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    );
  }
  if (id === 'bank') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" aria-hidden>
        <rect x="3" y="4" width="18" height="14" rx="2" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" aria-hidden>
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
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
