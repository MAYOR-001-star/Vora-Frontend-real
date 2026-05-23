export interface SummaryRow {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface StatItem {
  value: string;
  label: string;
  valueClassName?: string;
}

export type TimelineStepStatus = 'done' | 'pending' | 'future';

export interface TimelineStep {
  status: TimelineStepStatus;
  title: string;
  description: string;
  dateLabel?: string;
  stepNumber?: number;
}

export interface VaultConfirmationData {
  vaultReference: string;
  roleTitle: string;
  goLiveDate: string;
  goLiveDateFormatted: string;
  submittedDateFormatted: string;
  reminderDateFormatted: string;
  vaultPeriodEndFormatted: string;
  preQualifiedCount: number;
  daysUntilGoLive: number;
  escrowRows: SummaryRow[];
}
