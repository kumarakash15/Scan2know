import { createContext, useContext, useState, useEffect } from "react"

// 🔥 Create Context
const AuthContext = createContext()

// 🔥 Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  // ✅ Load from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("username")
    const storedToken = localStorage.getItem("token")

    if (storedUser && storedToken) {
      setUser(storedUser)
      setToken(storedToken)
    }
  }, [])

  // ✅ Login function
  const login = (username, token) => {
    localStorage.setItem("username", username)
    localStorage.setItem("token", token)

    setUser(username)
    setToken(token)
  }

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("token")

    setUser(null)
    setToken(null)

    window.location.href = "/login"
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// 🔥 Custom hook (easy usage)
export const useAuth = () => useContext(AuthContext)