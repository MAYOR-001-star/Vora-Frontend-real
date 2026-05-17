import { singleFlightRefresh } from './refreshToken';

let refreshTimeout: number | null = null;

/**
 * Safely decodes a JWT without external libraries to extract the 'exp' claim.
 */
function parseJwtExp(token: string): number | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const parsed = JSON.parse(jsonPayload);
    return parsed.exp ? parsed.exp * 1000 : null; // JS uses ms
  } catch (error) {
    console.error('Failed to parse JWT for scheduling refresh', error);
    return null;
  }
}

export function startTokenRefreshSchedule() {
  const token = localStorage.getItem('auth_token');
  if (!token) return;

  const expTime = parseJwtExp(token);
  if (!expTime) return;

  const currentTime = Date.now();
  // Schedule refresh 1 minute before expiry
  const delay = expTime - currentTime - 60000;

  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
  }

  if (delay > 0) {
    refreshTimeout = window.setTimeout(async () => {
      const success = await singleFlightRefresh();
      if (success) {
        // Restart schedule with new token
        startTokenRefreshSchedule();
      } else {
        localStorage.removeItem('auth_token');
        window.dispatchEvent(new Event('auth:unauthorized'));
      }
    }, delay);
  } else {
    // If it's already expired, the next API call will hit 401 and attempt a refresh,
    // or we could force a refresh now. For safety, we wait for a real request or explicit auth check.
  }
}

export function stopTokenRefreshSchedule() {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
    refreshTimeout = null;
  }
}
