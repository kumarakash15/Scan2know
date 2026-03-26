import { useEffect, useState } from 'react'
import axios from '../api/axios'

function Room({ year }) {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchRooms()
  }, [year])

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`/admin/dashboard/${year}`)
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

      <h3 className="mb-4 text-center text-md-start text-capitalize">
        {year} Year Boys
      </h3>

      <div className="row g-3">

        {rooms.map((room, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-4">

            <div className="card shadow h-100">

              <div className="card-header d-flex justify-content-between">
                <h5>Room {room["Room No"]}</h5>

                <button
                  className="btn btn-sm btn-success"
                  onClick={() => downloadQR(room["Room No"])}
                >
                  QR
                </button>
              </div>

              <div className="card-body">

                {room.students.map((student, i) => (
                  <div key={i} className="border rounded p-2 mb-2">

                    <div className="d-flex align-items-center">

                      <img
                        src={student.photo || "https://ui-avatars.com/api/?name=Student"}
                        alt="student"
                        className="me-2"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "8px" // ✅ square
                        }}
                      />

                      <div>
                        <strong>{student.name}</strong><br />
                        <small>Regd: {student.regd}</small><br />
                        <small>Branch: {student.branch}</small><br />
                        <small>Student Mobile Number: {student.mobile}</small><br />
                        <small>Parent Mobile Number: {student.parentMobile}</small>
                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Room