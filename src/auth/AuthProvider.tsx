'use client'
import { redirect, useRouter } from 'next/navigation'
import { createContext, useEffect, useReducer, useCallback, useMemo, use } from 'react'
// utils
import localStorageAvailable from '@/utils/localStorageAvailable'
//
import { isValidToken, setSession } from './utils'
import { ActionMapType, AuthStateType, AuthUser, JWTContextType } from './types'
import { useSnackbar } from '@/components/snackbar'
import { PATH_AUTH, PATH_DASHBOARD } from '@/routes/paths'

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean
    user: AuthUser | null
  }
  [Types.LOGIN]: {
    user: AuthUser
  }
  [Types.REGISTER]: {
    user: AuthUser
  }
  [Types.LOGOUT]: undefined
}

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>]

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
}

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    }
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    }
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    }
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    }
  }
  return state
}

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigate = useRouter()
  const storageAvailable = localStorageAvailable()
  const { enqueueSnackbar } = useSnackbar()

  const initialize = useCallback(async () => {
    try {
      const profile = await fetch('/api/auth/profile')
      const result = await profile.json()
      if (profile.ok) {
        fetch('/api/auth/token').then(res => res.json()).then(data => {
          setSession(data.token, () => {
            dispatch({
              type: Types.INITIAL,
              payload: {
                isAuthenticated: false,
                user: null
              },
            })
            navigate.push(PATH_AUTH.login)
          })
        })
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user: result.data,
          },
        })
      }
    } catch (error) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      })
    }
  }, [storageAvailable])

  useEffect(() => {
    initialize()
  }, [initialize])

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      const result = await response.json()
      if (!response.ok) {
        enqueueSnackbar(result.message, { variant: 'error' })
      } else {
        setSession(result.data.accessToken, () => {
          dispatch({
            type: Types.INITIAL,
            payload: {
              isAuthenticated: false,
              user: null
            },
          })
          navigate.push(PATH_AUTH.login)
        })
        dispatch({
          type: Types.LOGIN,
          payload: { user: result.data.user }
        })
        navigate.replace(PATH_AUTH.root)
      }
    } catch (error) {
      enqueueSnackbar(error instanceof Error ? error.message : 'Internal Server Error', { variant: 'error' })
    }
  }, [])

  // REGISTER
  const register = useCallback(async (email: string, password: string, name: string) => {
    try {
      const response = await fetch('/api/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify({ email, password, name })
      })
      const result = await response.json()
      if (!response.ok) {
        enqueueSnackbar(result.message, { variant: 'error' })
      } else {
        dispatch({
          type: Types.REGISTER,
          payload: {
            user: result.data as AuthUser
          },
        })
        enqueueSnackbar(result.message)
        navigate.push('/')
      }
    } catch (error) {
      enqueueSnackbar(error instanceof Error ? error.message : 'Internal Server Error', { variant: 'error' })
    }
  }, [])

  // LOGOUT
  const logout = useCallback(() => {
    try {
      setSession(null)
      navigate.push('/')
      dispatch({ type: Types.LOGOUT })
    } catch (error) {
      enqueueSnackbar(error instanceof Error ? error.message : 'Internal Server Error', { variant: 'error' })
    }
  }, [])

  const loginWithProvider = useCallback((provider: string) => {
    window.location.href = `/api/auth/${provider}`
  }, [])

  const memoizedValue = useMemo(() => ({
    isInitialized: state.isInitialized,
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    login,
    loginWithProvider,
    register,
    logout,
  }), [state, login, logout, register, loginWithProvider])

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}
