import { useState, useEffect } from 'react'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated (simplified)
    const token = localStorage.getItem('auth-token')
    const userData = localStorage.getItem('user-data')
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('auth-token')
        localStorage.removeItem('user-data')
      }
    }
    
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simplified login - in real app, this would call an API
    if (email === 'admin@office-intellect.ru' && password === 'admin123') {
      const userData = {
        id: '1',
        email,
        name: 'Администратор',
        role: 'admin'
      }
      
      localStorage.setItem('auth-token', 'mock-token')
      localStorage.setItem('user-data', JSON.stringify(userData))
      setUser(userData)
      setIsAuthenticated(true)
      return { success: true }
    }
    
    return { success: false, error: 'Неверные учетные данные' }
  }

  const logout = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user-data')
    setUser(null)
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  }
}

