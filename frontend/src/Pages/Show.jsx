import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "../api/axios"

function Show() {
  const { roomNo } = useParams()

  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRoom()
  }, [roomNo])

  const fetchRoom = async () => {
    try {
      const res = await axios.get(`/room/${roomNo}`);
      setRoom(res.data); // ✅ direct object
    } catch (err) {
      setRoom(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-4">

        <h3 className="text-center mb-4 placeholder-glow">
          <span className="placeholder col-3"></span>
        </h3>

        <div className="row g-3">

          {[...Array(4)].map((_, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4">

              <div className="card shadow h-100 text-center p-3 placeholder-wave">
                <span
                  className="placeholder rounded-circle mx-auto mb-3"
                  style={{
                    width: "200px",
                    height: "200px",
                    display: "block"
                  }}
                ></span>

                {/* Name */}
                <div className="placeholder-glow mb-3">
                  <span className="placeholder col-6"></span>
                </div>

                {/* Details */}
                <div className="placeholder-glow mb-2">
                  <span className="placeholder col-8"></span>
                </div>

                <div className="placeholder-glow mb-2">
                  <span className="placeholder col-7"></span>
                </div>

                <div className="placeholder-glow mb-2">
                  <span className="placeholder col-9"></span>
                </div>

                <div className="placeholder-glow">
                  <span className="placeholder col-8"></span>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    )
  }

  if (!room) {
    return <h5 className="text-center mt-4">No data found ❌</h5>
  }

  return (
    <div className="container py-4">

      <h3 className="text-center mb-4">
        Room {room.room}
      </h3>

      <div className="row g-3">

        {room.students.map((student, i) => (
          <div key={i} className="col-12 col-sm-6 col-md-4">

            <div className="card shadow h-100 text-center p-3">

              {/* ✅ Photo */}
              <img
                src={student.photo || `https://ui-avatars.com/api/?name=${student.name}`}
                alt="student"
                className="rounded mx-auto mb-3"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover"
                }}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${student.name}`
                }}
              />

              {/* ✅ Details */}
              <h5>{student.name}</h5>
              <p className="mb-1"><strong>Regd:</strong> {student.regd}</p>
              <p className="mb-1"><strong>Branch:</strong> {student.branch}</p>
              <p className="mb-0"><strong>Student Mobile Number:</strong> {student.mobile}</p>
              <p className="mb-0"><strong>Parent Mobile Number:</strong> {student.parentMobile}</p>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Show