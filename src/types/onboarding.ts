export interface StudyHoursInfo {
  term: string;
  holidays: string;
}

export type StudyHoursMap = Record<string, StudyHoursInfo>;
