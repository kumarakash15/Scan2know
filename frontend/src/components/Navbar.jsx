import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/eatmlogo.png'

function Navbar() {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-light bg-light px-3 sticky-top shadow-sm">

      <div className="container d-flex justify-content-between align-items-center">

        {/* Left side */}
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="logo"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          <span className="fw-bold fs-5">Eatm Hostel</span>
        </div>

        {/* Right side */}
        <div className="position-relative">

          {!token ? (
            // 🔓 Login Button
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          ) : (
            // 🔐 User Menu
            <div
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => setShowMenu(false)}
              style={{ cursor: 'pointer' }}
            >
              <i className="bi bi-person-circle fs-3"></i>

              {showMenu && (
                <div
                  className="card shadow position-absolute p-2"
                  style={{
                    right: 0,
                    top: '45px',
                    minWidth: '160px',
                    zIndex: 1000
                  }}
                >
                  <p className="mb-2 fw-bold text-center">{username}</p>

                  <button
                    className="btn btn-sm btn-danger w-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </nav>
  )
}

export default Navbar