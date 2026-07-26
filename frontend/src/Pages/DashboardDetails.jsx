import { useEffect, useState } from 'react'
import axios from '../api/axios'

function DashboardDetails() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get('/admin/dashboard')
      setData(res.data || [])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const totalRooms = data.length

  const totalStudents = data.reduce((acc, item) => {
    let count = 0

    if (item["Student 1 Name"]) count++
    if (item["Student 2 Name"]) count++
    if (item["Student 3 Name"]) count++
    if (item["Student 4 Name"]) count++

    return acc + count
  }, 0)

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row g-3">

          <div className="col-md-4">
            <div className="card p-4 shadow">
              <h5 className="placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <h2 className="placeholder-glow">
                <span className="placeholder col-4"></span>
              </h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 shadow placeholder-wave">
              <h5 className="placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <h2 className="placeholder-glow">
                <span className="placeholder col-4"></span>
              </h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-4 shadow placeholder-wave">
              <h5 className="placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
              <h2 className="placeholder-glow">
                <span className="placeholder col-4"></span>
              </h2>
            </div>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      <div className="row g-3">

        <div className="col-md-4">
          <div className="card p-4 text-center shadow">
            <h5>Total Hostel</h5>
            <h2>1</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-4 text-center shadow">
            <h5>Total Rooms</h5>
            <h2>{totalRooms}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-4 text-center shadow">
            <h5>Total Students</h5>
            <h2>{totalStudents}</h2>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DashboardDetails