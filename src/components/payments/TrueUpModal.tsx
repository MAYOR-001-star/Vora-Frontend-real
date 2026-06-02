import React from 'react';
import { CloseIcon } from '../common/Icons';
import Button from '../common/Button';
import AlertBanner from '../common/AlertBanner';
import toast from 'react-hot-toast';

interface TrueUpModalProps {
  open: boolean;
  onClose: () => void;
}

const TrueUpModal: React.FC<TrueUpModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  const handlePay = () => {
    toast.success('True-up payment processed. $750 charged to card on file.');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/55"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-[14px] w-full max-w-[560px] max-h-[92vh] flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="px-6 py-4 border-b border-[#E6E6E6] flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-semibold text-[#1A1A1A]">True-Up Calculation</h2>
            <p className="text-[11px] text-[#808080] mt-0.5">#TU-2025-0008 · Global Health Research</p>
          </div>
          <button type="button" onClick={onClose} className="p-1 cursor-pointer">
            <CloseIcon size={18} strokeWidth={2} />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto custom-scrollbar flex-1">
          <AlertBanner variant="blue" className="mb-5 !text-xs">
            True-up must be paid within 24 hours of hire confirmation for the offer letter to be released.
          </AlertBanner>
          <div className="bg-[#F7F7F7] border border-[#E6E6E6] rounded-[10px] p-4 mb-4">
            <p className="text-xs font-semibold text-[#808080] uppercase tracking-wide mb-3">
              True-Up Calculation Breakdown
            </p>
            {[
              ['Salary range declared at upload', '$60,000, $80,000'],
              ['Midpoint used for escrow', '$70,000'],
              ['Escrow locked at upload', '$10,500 (15% × $70,000)'],
              ['Final salary declared at hire', '$75,000'],
              ['Correct fee on final salary', '$11,250 (15% × $75,000)'],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-3 text-[13px] py-2 border-b border-[#E6E6E6] last:border-0"
              >
                <span className="text-[#808080]">{label}</span>
                <span className="font-semibold text-[#1A1A1A] text-right">{value}</span>
              </div>
            ))}
            <div className="flex justify-between gap-3 text-sm font-semibold pt-2.5 mt-1 border-t-2 border-[#E6E6E6]">
              <span className="text-[#1A1A1A]">True-up owed</span>
              <span className="text-[#DC2626]">$750.00</span>
            </div>
          </div>
          {[
            ['Charged to', 'Mastercard ••••4242 (on file)'],
            ['Salary within declared range?', '✓ Yes ($75k within $60k,$80k)'],
            ['Offer letter release', 'Held until true-up paid'],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between text-[13px] py-2 border-b border-[#F7F7F7]">
              <span className="text-[#808080]">{label}</span>
              <span className="font-semibold text-[#1A1A1A] text-right">{value}</span>
            </div>
          ))}
        </div>
        <div className="px-6 py-3.5 border-t border-[#E6E6E6] flex justify-end gap-2.5 shrink-0">
          <Button variant="outline" fullWidth={false} size="sm" className="font-semibold" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" fullWidth={false} size="sm" className="font-semibold" onClick={handlePay}>
            Pay True-Up Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrueUpModal;
