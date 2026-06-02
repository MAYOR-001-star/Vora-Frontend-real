import React from 'react';
import PaymentCard from './PaymentCard';

const EscrowTrueUpInfoCard: React.FC = () => (
  <PaymentCard title="Escrow & True-Up Model" bodyClassName="px-5 py-4">
    <div className="text-xs text-[#808080] leading-[1.75] space-y-2">
      <p>
        <strong className="text-[#4A4A4A] font-semibold">How escrow is calculated:</strong> When you post a
        role with a salary range, VORA locks your fee on the <strong>midpoint</strong> of that range.
        Example: range $60k,$80k → midpoint $70k → fee locked = 15% × $70k ={' '}
        <strong>$10,500</strong>.
      </p>
      <p>
        <strong className="text-[#4A4A4A] font-semibold">True-up at hire:</strong> When you confirm a hire
        and declare the final accepted salary, VORA automatically calculates whether you owe more (true-up
        charge) or are owed a credit.
      </p>
      <p>
        <strong className="text-[#4A4A4A] font-semibold">Fee rates:</strong> Global South employers →{' '}
        <strong>15%</strong>. Global North employers → <strong>20%</strong>.
      </p>
      <p>
        <strong className="text-[#4A4A4A] font-semibold">No-hire search fee:</strong> If a role closes
        without a hire, 10% of the locked escrow fee is non-refundable.
      </p>
    </div>
  </PaymentCard>
);

export default EscrowTrueUpInfoCard;
