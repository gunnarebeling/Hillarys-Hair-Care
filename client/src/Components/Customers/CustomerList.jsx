import { useEffect, useState } from "react"
import { getAllCustomers } from "../../Services/customerServices"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"

export const CustomerList = () => {
    const [allCustomers, setAllCustomers] = useState([])

    useEffect(() => {
        getAllCustomers().then(res => setAllCustomers(res))
    }, [])

    return (
        <div className="container">
            <div className="d-flex align-items-center">
                <h3 className="m-2">Customers</h3>
            
            </div>
            <Table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>edit</th>
                </tr>
                </thead>
                <tbody>
                    {allCustomers.map(s => {
                        return (
                            <tr key={s.id}>
                                <td>{s.name}</td>
                                <td>{s.email}</td>
                                <td>{s.phoneNumber}</td>
                                <td>
                                    <Link to={`${s.id}/edit`} >edit</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
         </div>
        )
}