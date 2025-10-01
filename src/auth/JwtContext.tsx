'use client'
import { useRouter } from 'next/navigation'
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react'
// utils
import { axiosInstance } from '@/utils/axios'
import localStorageAvailable from '@/utils/localStorageAvailable'
//
import { isValidToken, setSession } from './utils'
import { ActionMapType, AuthStateType, AuthUserType, JWTContextType } from './types'
import { API_ENDPOINT } from '@/routes/api'
import { useSnackbar } from '@/components/snackbar'
import { PATH_AUTH } from '@/routes/paths'

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

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
    user: AuthUserType
  }
  [Types.LOGIN]: {
    user: AuthUserType
  }
  [Types.REGISTER]: {
    user: AuthUserType
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

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigate = useRouter()
  const storageAvailable = localStorageAvailable()
  const { enqueueSnackbar } = useSnackbar()

  const initialize = useCallback(async () => {
    try {
      const response = await fetch('/api/token', { method: 'GET' })
      const accessToken = await response.json()
      if (accessToken && isValidToken(accessToken)) {
        await setSession(accessToken)
        const response = await axiosInstance(API_ENDPOINT.user.profile, { method: "GET" })
        const user = response.data.data
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
          },
        })
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      }
    } catch (error) {
      console.error(error)
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
  const login = useCallback(async (username: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      })
      const result = await response.json()
      const { message, data } = result
      enqueueSnackbar(message || "Đăng nhập thành công")
      navigate.replace(PATH_AUTH.root)
      dispatch({
        type: Types.LOGIN,
        payload: {
          user: data.user,
        },
      })
    } catch (error) {
      enqueueSnackbar(error instanceof Error ? error.message : 'Internal Server Error', { variant: 'error' })
    }
  }, [])

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, firstName: string, lastName: string) => {
      const response = await axiosInstance.post('/api/account/register', {
        email,
        password,
        firstName,
        lastName,
      })
      const { accessToken, user } = response.data

      localStorage.setItem('accessToken', accessToken)

      dispatch({
        type: Types.REGISTER,
        payload: {
          user,
        },
      })
    },
    []
  )

  // LOGOUT
  const logout = useCallback(async () => {
    try {
      await setSession(null)
      navigate.replace(PATH_AUTH.login);
      dispatch({
        type: Types.LOGOUT
      })
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error instanceof Error ? error.message : 'Internal Server Error', { variant: 'error' })
    }
  }, [])

  const memoizedValue = useMemo(() => ({
    isInitialized: state.isInitialized,
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    method: 'jwt',
    login,
    loginWithGoogle: () => { },
    loginWithGithub: () => { },
    loginWithTwitter: () => { },
    register,
    logout,
  }), [state.isAuthenticated, state.isInitialized, state.user, login, logout, register])

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}
