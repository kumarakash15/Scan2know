import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from "../components/LeftSidebar.jsx"
import DashboardDetails from './DashboardDetails'
import Room from './Room.jsx'

function Dashboard() {
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState("dashboard")
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/login')
  }, [])

  const handlePageClick = (page) => {
    setActivePage(page)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardDetails />

      case "4th":
      case "3rd":
      case "2nd":
      case "1st":
      case "pharmacy":
        return <Room year={activePage} />

      default:
        return <h2>Welcome</h2>
    }
  }

  return (
    <div className="d-flex flex-column">

      {/* Mobile Top Bar */}
      <div className="bg-dark text-white p-2 d-flex align-items-center d-md-none">
        <button
          className="btn btn-outline-light me-2"
          onClick={() => setShowSidebar(true)}
        >
          <i className="bi bi-list"></i>
        </button>
        <span className="fw-bold">Dashboard</span>
      </div>

      <div className="d-flex flex-grow-1">

        {/* Sidebar */}
        <Sidebar
          activePage={activePage}
          handlePageClick={handlePageClick}
          handleLogout={handleLogout}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />

        {/* RIGHT CONTENT */}
        <div
          className="flex-grow-1 bg-light hide-scrollbar"
          style={{
            maxHeight: "100vh",
            overflowY: "auto"
          }}
        >
          <div className="p-3 p-md-4">
            {renderContent()}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard