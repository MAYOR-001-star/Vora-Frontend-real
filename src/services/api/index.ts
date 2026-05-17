import React from 'react';
import { singleFlightRefresh } from './refreshToken';
import { toast } from 'react-hot-toast';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.vora.com/v1';

export interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
  url: string;
  body?: any;
  auth?: boolean;
}

export type ApiError = {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
};

async function fetchWithInterceptors(options: ApiRequestOptions): Promise<any> {
  const { url, body, auth = true, ...fetchOptions } = options;

  let headers = new Headers(fetchOptions.headers || {});
  if (!headers.has('Content-Type') && !(body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (auth) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    // Ensure cookies are sent for refresh endpoint if using HTTP-only cookies
    fetchOptions.credentials = 'include';
  }

  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  let reqBody = body;
  if (body && !(body instanceof FormData)) {
    reqBody = JSON.stringify(body);
  }

  let response = await fetch(fullUrl, {
    ...fetchOptions,
    headers,
    body: reqBody,
  });

  if (response.status === 401 && auth) {
    // Attempt token refresh
    const refreshed = await singleFlightRefresh();
    if (refreshed) {
      // Retry original request with new token
      const newToken = localStorage.getItem('auth_token');
      if (newToken) headers.set('Authorization', `Bearer ${newToken}`);
      response = await fetch(fullUrl, {
        ...fetchOptions,
        headers,
        body: reqBody,
      });
    } else {
      // Refresh failed, trigger global logout
      localStorage.removeItem('auth_token');
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
  }

  // Read response
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // Human-friendly error message extraction
    let cleanMessage = 'Something went wrong';
    if (data) {
      const errorList = data.data?.errors || data.errors;
      if (Array.isArray(errorList) && errorList.length > 0) {
        cleanMessage = errorList
          .map(err => {
            if (typeof err === 'string') {
              return err
                .replace(/property /gi, '')
                .replace(/courseInterest/gi, 'Course Interest')
                .replace(/courseIntent/gi, 'Course Intent')
                .replace(/typeOfInterest/gi, 'Type of Interest')
                .replace(/preferredFormat/gi, 'Preferred Format')
                .replace(/yearsOfExperienceBand/gi, 'Years of Experience')
                .replace(/websiteOrPortfolioUrl/gi, 'Portfolio URL')
                .replace(/should not exist/gi, 'is not allowed');
            }
            return JSON.stringify(err);
          })
          .join('\n');
      } else if (typeof data.message === 'string') {
        cleanMessage = data.message
          .replace(/property /gi, '')
          .replace(/courseInterest/gi, 'Course Interest')
          .replace(/courseIntent/gi, 'Course Intent')
          .replace(/typeOfInterest/gi, 'Type of Interest')
          .replace(/preferredFormat/gi, 'Preferred Format')
          .replace(/yearsOfExperienceBand/gi, 'Years of Experience')
          .replace(/websiteOrPortfolioUrl/gi, 'Portfolio URL')
          .replace(/should not exist/gi, 'is not allowed');
      }
    }

    const error: ApiError = {
      message: cleanMessage,
      status: response.status,
      errors: data?.errors || data,
    };
    
    if (response.status !== 401) {
      const messageLines = cleanMessage.split('\n');
      toast.error(
        React.createElement(
          'div',
          { style: { display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' } },
          messageLines.map((line, idx) =>
            React.createElement(
              'div',
              { key: idx, style: { fontSize: '13px', lineHeight: '1.4', fontWeight: 500 } },
              line
            )
          )
        ),
        {
          duration: 6000,
          style: {
            background: '#fff',
            color: '#333',
            border: '1px solid #ecc9c9',
            padding: '12px 16px',
            maxWidth: '450px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }
        }
      );
    }
    
    throw error;
  }

  // Returns the exact JSON body, mirroring axios `res.data` conceptually as requested
  return data;
}

export const apiClient = {
  get: <T = any>(options: Omit<ApiRequestOptions, 'body'>): Promise<T> => {
    return fetchWithInterceptors({ ...options, method: 'GET' });
  },
  post: <T = any>(options: ApiRequestOptions): Promise<T> => {
    return fetchWithInterceptors({ ...options, method: 'POST' });
  },
  put: <T = any>(options: ApiRequestOptions): Promise<T> => {
    return fetchWithInterceptors({ ...options, method: 'PUT' });
  },
  patch: <T = any>(options: ApiRequestOptions): Promise<T> => {
    return fetchWithInterceptors({ ...options, method: 'PATCH' });
  },
  delete: <T = any>(options: ApiRequestOptions): Promise<T> => {
    return fetchWithInterceptors({ ...options, method: 'DELETE' });
  },
};
