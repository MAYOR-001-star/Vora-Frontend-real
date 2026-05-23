export interface VaultEditOriginal {
  roleType: string;
  roleTitle: string;
  location: string;
  workFormat: string;
  positions: string;
  goLiveDate: string;
  startDate: string;
  roleGoal: string;
  responsibilities: string;
  skills: string;
  tools: string;
  languages: string;
  preAssessment: string;
  experienceYears: string;
  minQualification: string;
  intPolicy: string;
  preferredProfile: string;
  workingStyle: string;
  workCulture: string;
  personalityTraits: string;
  teamNotes: string;
  compType: string;
  salMin: string;
  salMax: string;
  benefits: string;
}

export interface VaultEditChange {
  field: string;
  oldValue: string;
  newValue: string;
}

export interface EscrowRecalcResult {
  originalMidpoint: number;
  newMidpoint: number;
  positions: number;
  originalEscrow: number;
  newEscrow: number;
  adjustment: number;
}
