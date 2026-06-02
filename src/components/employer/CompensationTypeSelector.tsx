import React from 'react';
import SelectableCard from '../common/SelectableCard';
import { BriefcaseSolidIcon, FileIcon, ClockIcon, MinusCircleIcon, GraduationCapIcon, HomeIcon } from '../common/Icons';

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
    icon: <BriefcaseSolidIcon size={16} strokeWidth={2} />,
  },
  {
    id: 'con',
    title: 'Contract / Daily rate',
    desc: 'Contract, consultancy, locum / agency shift, secondment, short-term gig, per diem, retainer',
    icon: <FileIcon size={16} strokeWidth={2} />,
  },
  {
    id: 'sti',
    title: 'Stipend / Fellowship',
    desc: 'Fellowship, traineeship, internship (paid), residency',
    icon: (
      <ClockIcon size={16} strokeWidth={2} />
    ),
  },
  {
    id: 'unp',
    title: 'Unpaid / Flat-fee',
    desc: 'Unpaid internship, volunteer, academic placement, VSO',
    icon: (
      <MinusCircleIcon size={16} strokeWidth={2} />
    ),
  },
  {
    id: 'phd',
    title: 'Funded PhD studentship',
    desc: 'Fee calculated on year-1 stipend value only (tuition waiver excluded)',
    icon: (
      <GraduationCapIcon size={16} strokeWidth={2} />
    ),
  },
  {
    id: 'uni',
    title: 'University admissions (flat fee)',
    desc: 'Self-funded student placement, MSc, MPH, undergraduate, short course. VORA charges a flat placement fee, not a percentage.',
    icon: (
      <HomeIcon size={16} strokeWidth={2} />
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
