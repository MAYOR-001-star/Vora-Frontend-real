import React from 'react';
import SelectableCard from '../common/SelectableCard';

export type CompensationTypeId = 'sal' | 'con' | 'sti' | 'unp' | 'phd' | 'uni';

interface CompensationTypeSelectorProps {
  value: CompensationTypeId;
  onChange: (id: CompensationTypeId) => void;
}

const COMPENSATION_TYPES: {
  id: CompensationTypeId;
  title: string;
  desc: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'sal',
    title: 'Salaried',
    desc: 'Full-time, part-time, postdoc, research post, teaching post',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2H8a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    id: 'con',
    title: 'Contract / Daily rate',
    desc: 'Contract, consultancy, locum / agency shift, secondment, short-term gig, per diem, retainer',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    id: 'sti',
    title: 'Stipend / Fellowship',
    desc: 'Fellowship, traineeship, internship (paid), residency',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    id: 'unp',
    title: 'Unpaid / Flat-fee',
    desc: 'Unpaid internship, volunteer, academic placement, VSO',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    id: 'phd',
    title: 'Funded PhD studentship',
    desc: 'Fee calculated on year-1 stipend value only (tuition waiver excluded)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    id: 'uni',
    title: 'University admissions (flat fee)',
    desc: 'Self-funded student placement — MSc, MPH, undergraduate, short course. VORA charges a flat placement fee, not a percentage.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

const CompensationTypeSelector: React.FC<CompensationTypeSelectorProps> = ({
  value,
  onChange,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
    {COMPENSATION_TYPES.map((t) => (
      <SelectableCard
        key={t.id}
        title={t.title}
        description={t.desc}
        icon={t.icon}
        selected={value === t.id}
        onClick={() => onChange(t.id)}
      />
    ))}
  </div>
);

export default CompensationTypeSelector;
