import React from 'react';
import toast from 'react-hot-toast';
import Button from '../common/Button';
import Tag from '../common/Tag';
import { CloseIcon } from '../common/Icons';
import TransactionTypeIcon from './TransactionTypeIcon';
import type { TransactionListItem } from '../../types/transactionsList';
import {
  formatTransactionAmount,
  formatTransactionTypeLabel,
  transactionAmountClass,
  transactionTypeToIcon,
} from '../../utils/transactionsList';
import { paymentStatusToTagVariant } from '../../utils/paymentStatusTag';

interface TransactionReceiptModalProps {
  open: boolean;
  item: TransactionListItem | null;
  onClose: () => void;
}

function formatDetailKey(key: string): string {
  return key
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

const TransactionReceiptModal: React.FC<TransactionReceiptModalProps> = ({
  open,
  item,
  onClose,
}) => {
  if (!open || !item) return null;

  const baseRows: [string, React.ReactNode][] = [
    ['Transaction ID', `#${item.id}`],
    ['Date & Time', item.date],
    ['Type', formatTransactionTypeLabel(item.type)],
    [
      'Status',
      <Tag
        key="status"
        label={item.statusLabel}
        variant={paymentStatusToTagVariant(item.status)}
        className="!text-[10px] !py-0.5 !px-2"
      />,
    ],
    ['Job', item.job || '—'],
  ];

  const detailRows = Object.entries(item.detail ?? {}).map(
    ([key, value]) => [formatDetailKey(key), value] as [string, string],
  );

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
            <h2 className="text-base font-semibold text-[#1A1A1A]">Transaction Receipt</h2>
            <p className="text-[11px] text-[#808080] mt-0.5">#{item.id}</p>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-[#808080] hover:text-[#1A1A1A] cursor-pointer">
            <CloseIcon size={18} strokeWidth={2} />
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto custom-scrollbar flex-1">
          <div className="text-center pb-5 mb-5 border-b border-[#E6E6E6]">
            <div className="flex justify-center mb-2.5">
              <TransactionTypeIcon variant={transactionTypeToIcon(item.type)} />
            </div>
            <p className={`text-[28px] font-bold tracking-tight ${transactionAmountClass(item)}`}>
              {formatTransactionAmount(item)}
            </p>
            <p className="text-[13px] text-[#808080] mt-1">{item.title}</p>
          </div>

          {[...baseRows, ...detailRows].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between gap-4 text-[13px] py-2 border-b border-[#F7F7F7] last:border-0"
            >
              <span className="text-[#808080] shrink-0">{label}</span>
              <span className="font-semibold text-[#1A1A1A] text-right">{value}</span>
            </div>
          ))}

          {item.type === 'trueup_charge' && (
            <div className="bg-[#F7F7F7] border border-[#E6E6E6] rounded-[10px] px-3.5 py-3 mt-4">
              <p className="text-[11px] font-semibold text-[#808080] uppercase tracking-wide mb-2">
                True-Up Audit Trail
              </p>
              <p className="text-xs text-[#4A4A4A] leading-relaxed">
                Escrow was locked on midpoint salary. Actual salary confirmed higher at hire. True-up =
                (fee% × actual salary) − (fee% × midpoint). Full calculation logged and timestamped.
                Offer letter held until true-up paid within 24h window.
              </p>
            </div>
          )}

          <p className="text-[11px] text-[#ADADAD] text-center leading-relaxed mt-4 pt-4 border-t border-[#E6E6E6]">
            Official VORA payment receipt · Audit-logged · payments@vora.health
          </p>
        </div>

        <div className="px-6 py-3.5 border-t border-[#E6E6E6] flex flex-wrap justify-end gap-2.5 sticky bottom-0 bg-white shrink-0">
          <Button variant="outline" fullWidth={false} size="sm" pill={false} onClick={() => window.print()}>
            Print
          </Button>
          <Button
            variant="outline"
            fullWidth={false}
            size="sm"
            pill={false}
            onClick={() => toast.success('Receipt PDF downloaded')}
          >
            Download PDF
          </Button>
          <Button variant="primary" fullWidth={false} size="sm" pill={false} onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionReceiptModal;
