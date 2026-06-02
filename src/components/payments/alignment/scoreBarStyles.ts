import type { ScoreBarColor } from '../../../types/alignmentReview';

export const SCORE_BAR_FILL: Record<ScoreBarColor, string> = {
  primary: 'bg-[#0047CC]',
  success: 'bg-[#2CA62C]',
};

export const INTERPRETATION_BOX: Record<'blue' | 'green' | 'purple', string> = {
  blue: 'bg-white border-[#387DFF]/20 text-[#1e40af]',
  green: 'bg-[#EEFBEE] border-[#2CA62C]/20 text-[#135813]',
  purple: 'bg-[#F5F3FF] border-[#7C3AED]/20 text-[#5b21b6]',
};
