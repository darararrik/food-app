import { useState } from 'react'
import authApi from '@/shared/api/auth'

export const useLoginModal = (onClose: () => void) => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    if (username.length < 3) {
      setError('Username must be at least 3 characters')
      return false
    }
    if (!isLogin && !email.includes('@')) {
      setError('Please enter a valid email')
      return false
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validate()) return

    setLoading(true)
    try {
      let response
      if (isLogin) {
        // В Strapi identifier может быть username или email
        response = await authApi.login(username, password)
      } else {
        response = await authApi.register(username, email, password)
      }

      if (response.status === 200 || response.status === 201) {
        if (response.data.jwt) {
          localStorage.setItem('jwt', response.data.jwt)
        }
        onClose()
      }
    } catch (err: any) {
      const serverError = err.response?.data?.error?.message
      setError(serverError || 'Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setEmail('')
    setPassword('')
    setUsername('')
  }

  return {
    isLogin,
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    error,
    loading,
    handleSubmit,
    toggleMode,
  }
}
