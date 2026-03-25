import { Routes, Route, useLocation } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import NotFound from '../components/NotFound'

import Index from '../Pages/index'
import Login from '../Pages/Login'
import Dashboard from '../Pages/Dashboard'
import Room from '../Pages/Room'
import Show from '../Pages/Show'

function AppRoutes() {
  const location = useLocation()

  // ✅ Hide navbar/footer for public QR page
  const hideLayout = location.pathname.startsWith('/show')

  return (
    <div className="d-flex flex-column min-vh-100">

      {!hideLayout && <Navbar />}

      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/room" element={<Room />} />

          {/* ✅ FIXED ROUTE */}
          <Route path="/show/:roomNo" element={<Show />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!hideLayout && <Footer />}

    </div>
  )
}

export default AppRoutes