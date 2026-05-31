import React from 'react';
import { Link } from 'react-router-dom';

interface PaymentsBreadcrumbProps {
  current: string;
  className?: string;
}

const PaymentsBreadcrumb: React.FC<PaymentsBreadcrumbProps> = ({ current, className = '' }) => (
  <nav className={`flex items-center gap-1.5 text-[13px] ${className}`} aria-label="Breadcrumb">
    <Link to="/payments" className="text-[#0047CC] font-semibold hover:underline">
      Payments
    </Link>
    <span className="text-[#ADADAD]" aria-hidden>
      /
    </span>
    <span className="text-[#808080]">{current}</span>
  </nav>
);

export default PaymentsBreadcrumb;
