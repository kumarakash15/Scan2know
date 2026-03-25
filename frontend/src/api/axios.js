import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
})

// 🔐 Attach token to every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// 🌐 Global response handler
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === 401 || status === 403) {
      // 🔐 Token expired or invalid → logout
      localStorage.removeItem('token')
      localStorage.removeItem('username')

      alert("Session expired. Please login again 🔐")
      window.location.href = '/login'
    }

    if (status === 500) {
      alert("Server error 💥")
    }

    if (status === 404) {
      console.error("API route not found ❌")
    }

    return Promise.reject(error)
  }
)

export default instance