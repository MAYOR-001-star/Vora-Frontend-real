import React from 'react';
import type { SavedMethodType } from '../../../types/paymentMethods';

interface PaymentMethodLogoProps {
  type: SavedMethodType;
  className?: string;
}

const PaymentMethodLogo: React.FC<PaymentMethodLogoProps> = ({ type, className = '' }) => {
  const box = `w-[52px] h-[34px] border border-[#E6E6E6] rounded-md flex items-center justify-center shrink-0 bg-white ${className}`;

  if (type === 'stripe') {
    return (
      <div className={box}>
        <svg width="34" height="22" viewBox="0 0 38 24" aria-hidden>
          <rect width="38" height="24" rx="4" fill="#1434CB" />
          <circle cx="15" cy="12" r="7" fill="#EB001B" />
          <circle cx="23" cy="12" r="7" fill="#F79E1B" />
          <path d="M19 7.27a7 7 0 0 1 0 9.46 7 7 0 0 1 0-9.46Z" fill="#FF5F00" />
        </svg>
      </div>
    );
  }

  if (type === 'paystack') {
    return (
      <div className={`${box} !bg-[#f8f8f8]`}>
        <svg width="34" height="14" viewBox="0 0 60 18" aria-hidden>
          <text x="0" y="13" fontFamily="Arial" fontSize="13" fontWeight="bold" fill="#00C3E3">
            Pay
          </text>
          <text x="26" y="13" fontFamily="Arial" fontSize="13" fontWeight="bold" fill="#011B33">
            stack
          </text>
        </svg>
      </div>
    );
  }

  if (type === 'flutterwave') {
    return (
      <div className={`${box} !bg-[#fff7ed]`}>
        <svg width="36" height="20" viewBox="0 0 80 24" aria-hidden>
          <text x="0" y="17" fontFamily="Arial" fontSize="11" fontWeight="900" fill="#F5A623">
            Flutter
          </text>
          <text x="44" y="17" fontFamily="Arial" fontSize="11" fontWeight="900" fill="#E8351E">
            wave
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div className={`${box} !bg-[#f5f3ff]`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" aria-hidden>
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 12h.01M12 12h.01M16 12h.01" />
      </svg>
    </div>
  );
};

export default PaymentMethodLogo;
