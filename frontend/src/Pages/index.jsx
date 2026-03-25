import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Index() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/dashboard')
    }
  }, [])

  return (
    <div className="container py-5">

      <div className="row justify-content-center text-center">

        <div className="col-12 col-md-10 col-lg-8">

          {/* Title */}
          <h1 className="fw-bold mb-3 display-5">
            Eatm Hostel Management System
          </h1>

          {/* College Name */}
          <h4 className="text-muted mb-4">
            Einstein Academy of Technology and Management
          </h4>

          {/* Description */}
          <p className="lead mb-3">
            Welcome to the Eatm Hostel Management System — a smart and efficient
            platform designed to simplify hostel operations.
          </p>

          <p className="mb-4">
            From managing student records to tracking room allocations,
            everything is handled in one place. Stay connected, organized,
            and informed with ease.
          </p>

        </div>

      </div>

    </div>
  )
}

export default Index