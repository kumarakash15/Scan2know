import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/dashboard')
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('/admin-login', {
        username,
        password
      })

      if (res.data.success) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', username)

        navigate('/dashboard')
      }
    } catch (err) {
      alert('Invalid username or password ❌')
    }
  }

  return (
    <div className="container-fluid">

      <div className="row min-vh-100 align-items-center justify-content-center">

        <div className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-3">

          <div className="card shadow p-4">

            <h3 className="text-center mb-4">Login</h3>

            <form onSubmit={handleLogin}>

              {/* Username */}
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  placeholder="Enter Your Username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Button */}
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login