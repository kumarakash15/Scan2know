import axios from "axios"

// 🌐 Create instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
})

// 🔐 REQUEST INTERCEPTOR (Attach Token)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// 🌐 RESPONSE INTERCEPTOR (Global Error Handling)
instance.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status

    console.error("API ERROR:", error.response || error.message)

    // 🔐 Auth errors
    if (status === 401 || status === 403) {
      localStorage.removeItem("token")
      localStorage.removeItem("username")

      alert("Session expired. Please login again 🔐")
      window.location.href = "/login"
    }

    // 💥 Server error
    if (status === 500) {
      alert("Server error 💥")
    }

    // ❌ Not found
    if (status === 404) {
      console.warn("API route not found ❌")
    }

    return Promise.reject(error)
  }
)

export default instance