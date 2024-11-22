import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAppointmentDetails } from "../../Services/appointmentServices"
import { Table } from "reactstrap"

export const AppointmentDetails = () => {
    const {appId} = useParams()
    const [appointment, setAppointment] = useState({})

    useEffect(() => {
        getAppointmentDetails(appId).then(res => setAppointment(res))
    }, [])

    return (
        <div className="container">
            <div className="d-flex">
                <h4 className="m-2">{appointment?.date}</h4>
                <h4 className="m-2">{appointment.timeSlot?.time}</h4>
            </div>
            <Table>
                <tbody>
                    <tr>
                        <th>Customer</th>
                        <td>{appointment.customer?.name}</td>
                    </tr>
                    <tr>
                        <th>Stylist</th>
                        <td>{appointment.stylist?.name}</td>
                    </tr>
                    <tr>
                        <th>Total Cost</th>
                        <td>${appointment.totalCost}</td>
                    </tr>
                </tbody>
            </Table>
            <div>
                <h5>Services</h5>
            </div>
            <Table>
                <tbody>
                    {appointment.services?.map(s => {
                        return (
                            <tr key={s.id} className="d-flex">
                                <td className="d-inline-block">{s.type}</td>
                                <td>${s.cost}</td>
                
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
        </div>
    )
}