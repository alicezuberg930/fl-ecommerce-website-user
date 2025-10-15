import BaseProvider from "./providers/base"

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined ? { type: Key } : { type: Key, payload: M[Key] }
}

export type AuthUser = {
  _id: string
  name: string
  email: string
  phone: string
  avatar: string | null
  provider: string
  isEmailVerified: boolean
}

export type AuthStateType = {
  isAuthenticated: boolean
  isInitialized: boolean
  user: AuthUser | null
}

export type JWTContextType = {
  isAuthenticated: boolean
  isInitialized: boolean
  user: AuthUser | null
  login: (username: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  loginWithProvider: (provider: string) => void
}

export type GoogleUserResponse = {
  sub: string
  email: string
  name: string
  picture: string
}

export type FacebookUserResponse = {
  id: string
  email: string
  name: string
  picture: {
    data: { url: string }
  }
}

export type OauthAccount = {
  email: string
  name: string
  avatar: string
}

export type OAuth2Token = {
  access_token: string
  token_type: string
  expires_in: number
}

export interface CookieOptions {
  domain?: string
  expires?: Date | string | number
  httpOnly?: boolean
  maxAge?: number
  path?: string
  sameSite?: 'Strict' | 'Lax' | 'None'
  secure?: boolean
  [key: string]: unknown
}

export interface AuthOptions {
  providers: Record<string, BaseProvider>
  cookieKeys?: {
    token?: string
    state?: string
    code?: string
    redirect?: string
  }
  cookieOptions?: CookieOptions
}