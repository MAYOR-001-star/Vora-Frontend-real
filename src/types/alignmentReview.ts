import type { PaymentsTabType, DecisionStatus } from './employer';

export type ScoreBarColor = 'primary' | 'success';

export interface ScoreDomain {
  label: string;
  value: number;
  description: string;
  barColor: ScoreBarColor;
}

export interface AssessmentTabData {
  scoreTitle: string;
  score: number;
  scoreColorClass: string;
  statusTag: string;
  testInfoTitle: string;
  testInfoLines: string[];
  domains: ScoreDomain[];
  interpretation?: {
    title: string;
    body: string;
    variant: 'blue' | 'green' | 'purple';
  };
  breakdownTitle?: string;
}

export interface VideoTabData extends AssessmentTabData {
  videoCaption: string;
  videoScoreLabel: string;
  communicationStats?: { label: string; value: string; valueColorClass: string }[];
}

export interface OverallScoreCard {
  label: string;
  score: number;
  scoreColorClass: string;
  tagLabel: string;
  tagVariant: 'blue' | 'green' | 'purple';
  cardClassName: string;
}

export interface OverallTabData {
  scoreCards: OverallScoreCard[];
  compositeScore: number;
  compositeLabel?: string;
  weightingNote: string;
  passSummary?: { title: string; paragraphs: string[] };
  recommendation: { body: string; variant: 'green' };
}

export interface AlignmentSessionRow {
  label: string;
  value: string;
  valueClassName?: string;
}

export interface AlignmentCandidateData {
  id: string;
  name: string;
  initials: string;
  avatarClassName: string;
  roleTitle: string;
  roleTagVariant: 'blue' | 'green';
  subtitle: string;
  reference: string;
  alignmentFee: number;
  session: AlignmentSessionRow[];
  psychometric: AssessmentTabData;
  sjt: AssessmentTabData;
  video: VideoTabData;
  overall: OverallTabData;
}

export interface HistoricalScoreCell {
  label: string;
  score: number;
  scoreColorClass?: string;
  statusTag?: { label: string; variant: 'blue' | 'green' | 'red' };
}

export interface HistoricalAlignmentSession {
  id: string;
  name: string;
  initials: string;
  avatarClassName: string;
  roleTitle: string;
  roleTagVariant: 'blue' | 'green' | 'red' | 'yellow';
  summaryLine: string;
  summaryLineClassName?: string;
  statusTag: { label: string; variant: 'green' | 'red' | 'gray' };
  borderClassName?: string;
  determination?: { body: string; variant: 'red' | 'green' };
  scores: HistoricalScoreCell[];
  paragraphs: { label: string; text: string }[];
}

export interface RejectionReasonOption {
  value: string;
  title: string;
  description: string;
}

export interface CandidateDecisionState {
  status: DecisionStatus;
  declaredSalary: string;
}

export type { PaymentsTabType, DecisionStatus };
