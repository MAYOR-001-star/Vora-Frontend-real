export interface Job {
  id: string;
  title: string;
  company?: string;
  logo?: string;
  location?: string;
  salary?: string;
  postedAt?: string;
  status: string;
  roleDetails: {
    type: string;
    level: string;
    positions: string;
    applicantsCount: string;
    commitment: string;
    timePreference: string;
    format: string;
    location: string;
    startDate: string;
    endDate: string;
    summary: string;
  };
  responsibilities: {
    problem: string;
    core: string;
    technicalSkills: Array<{ label: string; variant: 'blue' | 'green' | 'gray' | 'red' | 'yellow' }>;
    tools: Array<{ label: string; variant: 'blue' | 'green' | 'gray' | 'red' | 'yellow' }>;
  };
  experience: {
    academyLevel: string;
    relevantField: string;
    years: string;
    sectorBackground?: string;
    geographicExperience?: string;
    securityClearance?: string;
  };
  compensation: {
    type: string;
    range: string;
    midpoint: string;
    escrow: string;
    eligibility?: Array<{ label: string; variant: 'blue' | 'green' | 'gray' | 'red' | 'yellow' }>;
    preAssessment?: Array<{ label: string; variant: 'blue' | 'green' | 'gray' | 'red' | 'yellow' }>;
  };
  collaboration: {
    preferredStyle: Array<{ label: string; variant: 'blue' | 'green' | 'gray' | 'red' | 'yellow' }>;
    communicationStyle: string;
    communicationLanguage: string;
    personalityTraits: Array<{ label: string; variant: 'blue' | 'green' | 'gray' | 'red' | 'yellow' }>;
    workCulture: Array<{ label: string; variant: 'blue' | 'green' | 'gray' | 'red' | 'yellow' }>;
  };
}
