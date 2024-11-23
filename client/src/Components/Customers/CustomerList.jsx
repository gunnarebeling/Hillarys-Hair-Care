import { useEffect, useState } from "react"
import { getAllCustomers } from "../../Services/customerServices"
import { Table } from "react-bootstrap"

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
                </tr>
                </thead>
                <tbody>
                    {allCustomers.map(s => {
                        return (
                            <tr key={s.id}>
                                <td>{s.name}</td>
                                <td>{s.email}</td>
                                <td>{s.phoneNumber}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
         </div>
        )
}