import { useEffect, useState } from "react"
import { Table } from "reactstrap"
import { getAllAppointments } from "../../Services/appointmentServices"
import { Link } from "react-router-dom"
import { FilterDate } from "./FilterDate"

export const AppoointmentList = () => {
    const [allAppointments, setALlAppointments] = useState([])
    const [filteredAppointments, setFilter] = useState([])
    const today = new Date().toISOString().split('T')[0]

    useEffect(() => {
        getAllAppointments().then(res => setALlAppointments(res))
    }, [])

    useEffect(() => {
        let copy = [...allAppointments]
        copy = copy.filter(a => a.date === today)
        setFilter(copy)

    }, [allAppointments])
    return (
        <div className="container">
            <div className="sub-menu bg-light px-1">
                <h4>Appointments</h4>
                <div className="m-2">
                    <FilterDate allAppointments={allAppointments} setFilter={setFilter}/>
                </div>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Customer</th>
                        <th>Stylist</th>
                        <th>Total Cost</th>
                        <th>Details</th>
                        <th>edit/cancel</th>

                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.map(a => {
                        return (
                            <tr key={`appointment-${a.id}`}>
                                <th scope="row">{a.timeSlot.time}</th>
                                <td>{a.customer.name}</td>
                                <td>{a.stylist.name}</td>
                                <td>${a.totalCost}</td>
                                <td>
                                    <Link>details</Link>
                                </td>
                                <td>
                                    <Link>edit/cancel</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
       
        </div>
    )
}