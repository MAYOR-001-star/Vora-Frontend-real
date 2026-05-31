export interface JobPostedConfirmationData {
  jobId: string | null;
  slug: string;
  roleTitle: string;
  workFormat: string;
  location: string;
  formatLocationLabel: string;
  positions: number;
  shareUrl: string;
  candidatesMatched: number;
}
