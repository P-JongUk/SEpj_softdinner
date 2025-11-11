const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const config = {
    ...options,
    headers,
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

export const authAPI = {
  signup: async (signupData) => {
    return apiRequest('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(signupData),
    })
  },

  login: async (loginData) => {
    return apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    })
  },

  getCurrentUser: async () => {
    return apiRequest('/api/auth/me', {
      method: 'GET',
    })
  },

  logout: async () => {
    return apiRequest('/api/auth/logout', {
      method: 'POST',
    })
  },
}

