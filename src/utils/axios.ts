import axios, { AxiosError, AxiosResponse } from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_API,
  headers: { Accept: 'application/json' },
  validateStatus: (status) => status >= 200 && status < 500
})

axiosInstance.interceptors.request.use(async (config) => {
  if (document !== undefined) {
    const response = await fetch(`${document.location.origin}/api/token`, { method: 'GET' })
    const accessToken = await response.json()
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    } else {
      delete config.headers['Authorization']
    }
  }
  return config
}, (error: any) => {
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  return response
}, (error: AxiosError) => {
  console.log(error)
  if (!error.response) {
    console.log('Network err', error.message)
  } else {
    switch (error?.response.status) {
      case 401:
      // window.location.href = '/'
      // break
      case 404:
        console.log('error.response.message', error)
        break
      default:
        console.log(
          `%c ${error.response.status}  :`,
          'color: red font-weight: bold',
          error.config,
        )
        break
    }
  }
  // if (error.response) {
  //   return Promise.reject({
  //     error: error?.response,
  //     status: error.response.status,
  //     message: error.response.data.message,
  //   })
  // } else if (error.request) {
  //   return Promise.reject(error.request)
  // } else {
  //   return Promise.reject(error)
  // }
})