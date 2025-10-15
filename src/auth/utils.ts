import { axiosInstance } from '@/utils/axios'
import { redirect } from 'next/navigation';

export function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

  let jsonPayload;

  if (typeof window !== 'undefined') {
    // Browser: Use window.atob with the original polyfill logic
    jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
  } else {
    // Server (Node.js): Use Buffer for direct UTF-8 decoding
    jsonPayload = Buffer.from(base64, 'base64').toString('utf8');
  }

  return JSON.parse(jsonPayload);
}

export const isValidToken = (accessToken: string | undefined | null) => {
  if (!accessToken) return false

  const decoded = jwtDecode(accessToken)

  const currentTime = Date.now() / 1000

  return decoded.exp > currentTime
}

export const tokenExpired = (exp: number, action?: VoidFunction) => {
  let expiredTimer
  const currentTime = Date.now()
  // Test token expires after 10s
  // const timeLeft = currentTime + 5000 - currentTime // ~10s
  const timeLeft = exp * 1000 - currentTime
  clearTimeout(expiredTimer)
  expiredTimer = setTimeout(async () => {
    await fetch('/api/auth/sign-out', { method: "POST" })
    if (action) action()
  }, timeLeft)
}

export const setSession = (accessToken: string | null, action?: VoidFunction) => {
  if (accessToken) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken)
    tokenExpired(exp, action)
  } else {
    fetch('/api/auth/sign-out', { method: "POST" }).then(res => {
      if (res.ok) delete axiosInstance.defaults.headers.common.Authorization
    })
  }
}