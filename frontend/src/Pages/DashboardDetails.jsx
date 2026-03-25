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
            setData(res.data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    // 🔢 Calculations
    const totalRooms = data.length

    const totalStudents = data.reduce((acc, item) => {
        let count = 0
        if (item["Student 1 Name"]) count++
        if (item["Student 2 Name"]) count++
        if (item["Student 3 Name"]) count++
        if (item["Student 4 Name"]) count++
        return acc + count
    }, 0)

    const totalHostel = 1 // You can make dynamic later

    if (loading) return <h5>Loading...</h5>

    return (
        <div className="container-fluid">

            <div className="row g-3">

                {/* 🏠 Total Hostel */}
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card shadow text-center p-4">
                        <h5 className="text-muted">Total Hostel</h5>
                        <h2 className="fw-bold">{totalHostel}</h2>
                    </div>
                </div>
                {/* 🚪 Total Rooms */}
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card shadow text-center p-4">
                        <h5 className="text-muted">Total Rooms</h5>
                        <h2 className="fw-bold">{totalRooms}</h2>
                    </div>
                </div>
                {/* 👨‍🎓 Total Students */}
                <div className="col-12 col-sm-6 col-lg-4">
                    <div className="card shadow text-center p-4">
                        <h5 className="text-muted">Total Students</h5>
                        <h2 className="fw-bold">{totalStudents}</h2>
                    </div>
                </div>



            </div>

        </div>
    )
}

export default DashboardDetails