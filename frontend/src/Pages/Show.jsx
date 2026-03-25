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
      const res = await axios.get(`/room/${roomNo}`)

      if (res.data.length > 0) {
        setRoom(res.data[0])
      } else {
        setRoom(null)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <h5 className="text-center mt-4">Loading...</h5>
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
              <p className="mb-0"><strong>Mobile:</strong> {student.mobile}</p>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Show