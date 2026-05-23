import { createElement } from 'react';
import type { DefaultToastOptions } from 'react-hot-toast';
import ToastSuccessIcon from '../components/common/ToastSuccessIcon';

/** Shared success toast: white background, blue tick icon, no border. */
export const defaultToastOptions: DefaultToastOptions = {
  success: {
    className: 'vora-toast-success',
    icon: createElement(ToastSuccessIcon, { size: 'sm' }),
    style: {
      background: '#FFFFFF',
      color: '#1C1C1C',
      border: 'none',
      padding: '12px 16px',
      maxWidth: '450px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    },
  },
};
