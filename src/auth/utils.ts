// routes
import { PATH_AUTH } from '../routes/paths'
// utils
import { axiosInstance } from '@/utils/axios'
// ----------------------------------------------------------------------

export function jwtDecode(token: string) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  )

  return JSON.parse(jsonPayload)
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false
  }

  const decoded = jwtDecode(accessToken)

  const currentTime = Date.now() / 1000

  return decoded.exp > currentTime
}

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number, redirect?: VoidFunction) => {
  let expiredTimer
  const currentTime = Date.now()
  // Test token expires after 10s
  // const timeLeft = currentTime + 5000 - currentTime // ~10s
  const timeLeft = exp * 1000 - currentTime
  clearTimeout(expiredTimer)
  expiredTimer = setTimeout(async () => {
    await fetch('/api/logout', { method: "POST" })
    if (redirect) redirect()
  }, timeLeft)
}

// ----------------------------------------------------------------------

export const setSession = async (accessToken: string | null, redirect?: VoidFunction) => {
  if (accessToken) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken)
    tokenExpired(exp, redirect)
  } else {
    await fetch('/api/logout', { method: "POST" })
    delete axiosInstance.defaults.headers.common.Authorization
  }
}