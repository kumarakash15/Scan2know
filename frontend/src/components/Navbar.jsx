import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/eatmlogo.png'

function Navbar() {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const { user, token, logout } = useAuth()

  return (
    <nav className="navbar navbar-light bg-light px-3 sticky-top shadow-sm">

      <div className="container d-flex justify-content-between align-items-center">

        {/* Left */}
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="logo"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          <span className="fw-bold fs-5">Eatm Hostel</span>
        </div>

        {/* Right */}
        <div className="position-relative">

          {!token ? (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          ) : (
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
                  <p className="mb-2 fw-bold text-center">{user}</p>

                  <button
                    className="btn btn-sm btn-danger w-100"
                    onClick={logout}
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