export interface MentorPersonalInfo {
  title: string;
  lastName: string;
  firstName: string;
  email: string;
  professionalTitle: string;
  password?: string;
  confirmPassword?: string;
}

export interface MentorExpertiseInfo {
  primaryExpertise: string[];
  functionalStrength: string[];
  mentorshipFocus: string[];
}

export interface MentorCertificate {
  id: string;
  type: string;
  displayLabel: string;
  files: File[];
}

export interface MentorExperienceInfo {
  currentRole: string;
  organization: string;
  yearsOfExperience: string;
  websitePortfolio: string;
}

export interface MentorAvailabilityInfo {
  mentorshipFormat: string[];
  sessionsPerMonth: string;
  sessionLength: string[];
  candidateAccess: string[];
  timezone: string;
  preferredLanguage: string;
  regionalEquityPricing: boolean;
}

export interface MentorCourseDetails {
  courseType: string[];
  preferredFormat: string;
}
