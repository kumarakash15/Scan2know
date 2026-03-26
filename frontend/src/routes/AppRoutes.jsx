import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NotFound from '../components/NotFound'
import ErrorBoundary from '../components/ErrorBoundary'

import Index from '../Pages/index'
import Login from '../Pages/Login'
import Dashboard from '../Pages/Dashboard'
import Room from '../Pages/Room'
import Show from '../Pages/Show'

function AppRoutes() {
  const location = useLocation()

  // ✅ Hide ONLY navbar for QR page
  const hideNavbar = location.pathname.startsWith('/show')

  return (
    <div className="d-flex flex-column min-vh-100">

      {/* ✅ Navbar hidden only on /show */}
      {!hideNavbar && <Navbar />}

      <div className="flex-grow-1">

        {/* ✅ Error Boundary for 500 errors */}
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/room" element={<Room />} />
            <Route path="/show/:roomNo" element={<Show />} />

            {/* ✅ 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>

      </div>

      {/* ✅ Footer ALWAYS visible */}
      <Footer />

    </div>
  )
}

export default AppRoutes