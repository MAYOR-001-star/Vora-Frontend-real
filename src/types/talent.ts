export interface TalentPersonalInfo {
  firstName: string;
  lastName: string;
}

export interface TalentProfileInfo {
  professionalTitle: string;
  areasOfInterest: string[];
  experienceLevel: string;
  country: string;
}

export interface TalentWorkAuthInfo {
  nationalities: string[];
  residence: string;
  city: string;
  rightToWork: string;
  relocation: string;
  relocationDestinations: string;
  workArrangement: string;
  integrityChecked: boolean;
}

export interface TalentStudyPermitInfo {
  type: string;
  country: string;
  validity: string;
  hoursManual: string;
}

export interface TalentWorkPermitInfo {
  type: string;
  country: string;
  validity: string;
}

export interface TalentPRInfo {
  type: string;
  country: string;
  validity: string;
}
