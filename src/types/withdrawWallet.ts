export type WithdrawMethod = 'bank' | 'stripe';

export interface WithdrawMethodOption {
  id: WithdrawMethod;
  name: string;
  subtitle: string;
}

export interface TimelineStep {
  title: string;
  meta: string;
  status: 'done' | 'active' | 'pending';
}
