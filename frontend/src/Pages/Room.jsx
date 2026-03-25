import { useEffect, useState } from 'react'
import axios from '../api/axios'

function Room() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const res = await axios.get('/admin/dashboard/third')
      setRooms(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const downloadQR = async (roomNo) => {
    try {
      const res = await axios.get(`/admin/qr/${roomNo}`, {
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `room-${roomNo}.png`)
      document.body.appendChild(link)
      link.click()
    } catch (err) {
      alert("QR download failed ❌")
    }
  }

  if (loading) return <h5 className="text-center mt-4">Loading rooms...</h5>

  return (
    <div className="container-fluid py-3">

      <h3 className="mb-4 text-center text-md-start">3rd Year Rooms(300 to 330)</h3>

      <div className="row g-3">

        {rooms.map((room, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-4">

            <div className="card shadow h-100">

              {/* Room Header */}
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Room {room["Room No"]}</h5>

                <button
                  className="btn btn-sm btn-success"
                  onClick={() => downloadQR(room["Room No"])}
                >
                  QR
                </button>
              </div>

              {/* Students */}
              <div className="card-body">

                {room.students && room.students.length > 0 ? (
                  room.students.map((student, i) => (
                    <div key={i} className="border rounded p-2 mb-2">

                      <div className="d-flex align-items-center">

                        {/* ✅ Image */}
                        <img
                          src={student.photo || "https://ui-avatars.com/api/?name=Student"}
                          alt="student"
                          className="rounded-circle me-2"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover"
                          }}
                          onError={(e) => {
                            e.target.src = "https://ui-avatars.com/api/?name=Student";
                          }}
                        />

                        {/* Details */}
                        <div>
                          <strong>{student.name}</strong><br />
                          <small>Regd: {student.regd}</small><br />
                          <small>Branch: {student.branch}</small><br />
                          <small>Mobile: {student.mobile}</small>
                        </div>

                      </div>

                    </div>
                  ))
                ) : (
                  <p className="text-muted text-center">No students found</p>
                )}

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Room