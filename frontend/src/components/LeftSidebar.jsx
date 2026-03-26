import { useState } from 'react'
import "../App.css"

function Sidebar({ activePage, handlePageClick, handleLogout, showSidebar, setShowSidebar }) {
  const [showHostelMenu, setShowHostelMenu] = useState(false)

  return (
    <>
      {/* Overlay (mobile only) */}
      {showSidebar && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none"
          style={{ zIndex: 998 }}
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
    bg-dark text-white
    ${showSidebar ? 'mobile-show' : 'mobile-hide'}
  `}
        style={{
          width: '250px',
          height: '100vh',
          overflow: 'visible' // ❌ no scroll inside sidebar
        }}
      >
        <div className="p-4">

          {/* Close button (mobile) */}
          <div className="d-md-none text-end mb-3">
            <button
              className="btn btn-sm btn-light"
              onClick={() => setShowSidebar(false)}
            >
              ✕
            </button>
          </div>

          <ul className="nav nav-pills flex-column">

            {/* Dashboard */}
            <li className="nav-item">
              <button
                className={`nav-link text-start w-100 ${activePage === "dashboard" ? "active" : "text-white"
                  }`}
                onClick={() => {
                  handlePageClick("dashboard")
                  setShowSidebar(false)
                }}
              >
                <i className="bi bi-speedometer2 me-2"></i> Dashboard
              </button>
            </li>

            {/* Hostel */}
            <li className="nav-item mt-2">
              <button
                className="nav-link text-start w-100 text-white d-flex justify-content-between align-items-center"
                onClick={() => setShowHostelMenu(!showHostelMenu)}
              >
                <span>
                  <i className="bi bi-building me-2"></i> Main Boys Hostel
                </span>
                <i className={`bi ${showHostelMenu ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
              </button>

              {showHostelMenu && (
                <ul className="nav flex-column ms-3 mt-2">
                  {["4th", "3rd", "2nd", "1st", "pharmacy"].map((year) => (
                    <li className="nav-item" key={year}>
                      <button
                        className="nav-link text-white text-start"
                        onClick={() => {
                          handlePageClick(year)
                          setShowSidebar(false)
                        }}
                      >
                        {year === "pharmacy"
                          ? "Pharmacy"
                          : `${year} Year Boys`}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Logout */}
            <li className="nav-item mt-3">
              <button
                className="nav-link text-start w-100 text-white"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </button>
            </li>

          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar