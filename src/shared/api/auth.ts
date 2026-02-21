import { axiosInstance } from './base'

const authApi = {
  login: async (username: string, password: string) => {
    return axiosInstance.post('/auth/local', { identifier: username, password })
  },
  register: async (username: string, email: string, password: string) => {
    return axiosInstance.post('/auth/local/register', { username, email, password })
  },
}

export default authApi
