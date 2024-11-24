import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { getAllServices } from "../Services/serviceServices"

export const ServiceList = () => {
    const [allServices, setAllServices] = useState([])

    useEffect(() => {
        getAllServices().then(res => setAllServices(res))
    }, [])

    return (
        <div className="container">
            <div className="d-flex align-items-center">
                <h3 className="m-2">Services</h3>
            
            </div>
            <Table>
                <thead>
                <tr>
                    <th>Type</th>
                    <th>Cost</th>
                </tr>
                </thead>
                <tbody>
                    {allServices.map(s => {
                        return (
                            <tr key={s.id}>
                                <td>{s.type}</td>
                                <td>${s.cost}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
         </div>
        )
}