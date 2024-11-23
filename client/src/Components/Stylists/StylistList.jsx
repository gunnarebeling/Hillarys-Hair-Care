import { useEffect, useState } from "react"
import { getAllServices } from "../../Services/serviceServices"
import { getAllStylists } from "../../Services/stylistServices"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Button } from "reactstrap"

export const StylistList = () => {
    const [allStylists, setAllStylists] = useState([])



    useEffect(() => {
        getAllStylists().then(res => setAllStylists(res))
    }, [])

    const handleActivate = (e) => {
        
    }
    return (
        <div className="container">
            <div className="d-flex align-items-center">
                <h3 className="m-2">Stylists</h3>
                <Link to={"#"} >add Stylist</Link>
            </div>
            <Table>
                <thead>
                   <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>is Active</th>
                    <th></th>
                   </tr>
                </thead>
                <tbody>
                    {allStylists.map(s => {
                        return (
                            <tr key={s.id}>
                                <td>{s.name}</td>
                                <td>{s.email}</td>
                                <td>{s.phoneNumber}</td>
                                <td>{s.isActive ? "Active" : "Not Active"}</td>
                                <td>
                                    {s.isActive? (<button className="btn btn-warning">Deactivate</button>) : (<button className="btn btn-info" >Activate</button>) }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}