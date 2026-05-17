export interface EmployerPersonalInfo {
  firstName: string;
  lastName: string;
  workEmail: string;
  professionalTitle: string;
}

export interface EmployerOrgInfo {
  organizationName: string;
  organizationType: string;
  headquarters: string;
  institutionalMandate: string[];
  website: string;
}

export interface EmployerHiringNeeds {
  hiringRoles: string[];
  engagementFormat: string[];
  urgency: string;
}
