import React from 'react';
import { CloseIcon } from '../common/Icons';
import Button from '../common/Button';
import DetailRowList from './DetailRowList';
import type { EscrowDetailData } from '../../types/paymentsOverview';

interface EscrowDetailModalProps {
  open: boolean;
  data: EscrowDetailData | null;
  onClose: () => void;
}

const EscrowDetailModal: React.FC<EscrowDetailModalProps> = ({ open, data, onClose }) => {
  if (!open || !data) return null;

  return (
    <div
      className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/55"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-[14px] w-full max-w-[760px] max-h-[92vh] flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="px-6 py-4 border-b border-[#E6E6E6] flex items-center justify-between sticky top-0 bg-white z-10 shrink-0">
          <div>
            <h2 className="text-base font-semibold text-[#1A1A1A]">{data.title}</h2>
            <p className="text-[11px] text-[#808080] mt-0.5">{data.ref}</p>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-[#808080] hover:text-[#1A1A1A] cursor-pointer">
            <CloseIcon size={18} strokeWidth={2} />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto custom-scrollbar flex-1">
          <DetailRowList rows={data.rows} trueupNote={data.trueupNote} />
        </div>
        <div className="px-6 py-3.5 border-t border-[#E6E6E6] flex justify-end gap-2.5 sticky bottom-0 bg-white shrink-0">
          <Button variant="outline" fullWidth={false} size="sm" className="font-semibold" onClick={onClose}>
            Close
          </Button>
          <Button variant="outline" fullWidth={false} size="sm" className="font-semibold border-[#387DFF] text-[#0047CC]">
            View in Transactions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EscrowDetailModal;
