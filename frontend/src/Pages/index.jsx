import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import hostel from "../assets/hostel.jpg"

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

      <div className="row align-items-center">

        {/* Left Side - Image */}
        <div className="col-md-6 mb-4 mb-md-0 text-center">
          <img
            src={hostel}
            alt="hostel"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "800px", objectFit: "cover" }}
          />
        </div>

        {/* Right Side - Content */}
        <div className="col-md-6 text-center text-md-start">

          {/* Title */}
          <h1 className="fw-bold mb-3 display-5">
            Scan2Know
          </h1>

          {/* Subtitle */}
          <h4 className="text-muted mb-4">
            Smart Room Member Information System
          </h4>

          {/* Description */}
          <p className="lead mb-3">
            Scan2Know is a simple and smart solution to instantly access
            room member details using a quick scan.
          </p>

          <p className="mb-4">
            Just scan and get complete information about occupants —
            making identification, management, and record tracking fast,
            easy, and efficient.
          </p>

          {/* Button */}
          <button
            className="btn btn-primary px-4"
            onClick={() => navigate('/login')}
          >
            Get Started
          </button>

        </div>

      </div>

    </div>
  )
}

export default Index