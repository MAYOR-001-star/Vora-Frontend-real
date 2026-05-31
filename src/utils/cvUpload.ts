export const CV_ACCEPTED_EXTENSIONS = ['.pdf', '.docx', '.doc'] as const;

export const CV_ACCEPT_MIME =
  'application/pdf,.pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx,application/msword,.doc';

export const formatCvFileSize = (bytes: number): string => {
  const kb = Math.round(bytes / 1024);
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)}MB` : `${kb}KB`;
};

export const isAcceptedCvFile = (file: File): boolean => {
  const name = file.name.toLowerCase();
  return CV_ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));
};

export const ROLE_CV_UPLOAD_PATH = '/onboarding/talent/cv';
