import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login, token } = useAuth()

  useEffect(() => {
    if (token) {
      navigate('/dashboard')
    }
  }, [token, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const res = await axios.post('/admin-login', {
        username,
        password
      })

      if (res.data.success) {
        login(username, res.data.token)
        navigate('/dashboard')
      }
    } catch (err) {
      alert('Invalid username or password ❌')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row min-vh-100 align-items-center justify-content-center">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3">

          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>

            <form onSubmit={handleLogin}>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>

                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    required
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Login Processing...
                  </>
                ) : (
                  'Login'
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login