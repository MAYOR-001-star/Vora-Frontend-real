import React from 'react';
import PaymentCard from '../PaymentCard';
import { LOCATION_ROUTING_SECTIONS } from '../../../constants/paymentMethods';

const LocationRoutingCard: React.FC = () => (
  <PaymentCard title="Location-Aware Routing" bodyClassName="px-5 py-4">
    <p className="text-xs text-[#808080] leading-relaxed mb-3">
      VORA auto-routes to the best gateway for your country. You can always override this manually.
    </p>
    <div className="grid gap-1.5">
      {LOCATION_ROUTING_SECTIONS.map((section) => (
        <div key={section.label}>
          <p className="text-[10px] font-extrabold text-[#ADADAD] uppercase tracking-wide mt-2 mb-0.5 first:mt-0">
            {section.label}
          </p>
          {section.rows.map((row) => (
            <div
              key={`${section.label}-${row.region}`}
              className="flex justify-between items-center text-xs py-1.5 px-2.5 bg-[#F7F7F7] rounded-md gap-2"
            >
              <span className="text-[#4A4A4A]">{row.region}</span>
              <span className="shrink-0 flex items-center gap-1.5 font-semibold">
                <span style={{ color: row.gatewayColor }}>{row.gateway}</span>
                {row.secondaryGateway && (
                  <>
                    <span className="text-[#ADADAD] font-normal">or</span>
                    <span style={{ color: '#C2410C' }}>{row.secondaryGateway}</span>
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </PaymentCard>
);

export default LocationRoutingCard;
