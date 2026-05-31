import type { ShareChannel } from '../types/jobs';

export const buildShareHref = (
  channel: ShareChannel['id'],
  url: string,
  title: string,
): string => {
  const text = encodeURIComponent(`Check out this role on VORA: ${title}`);
  const encodedUrl = encodeURIComponent(url);

  switch (channel) {
    case 'email':
      return `mailto:?subject=${encodeURIComponent(title)}&body=${text}%20${encodedUrl}`;
    case 'whatsapp':
      return `https://wa.me/?text=${text}%20${encodedUrl}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`;
    default:
      return url;
  }
};
