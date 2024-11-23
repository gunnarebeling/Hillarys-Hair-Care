import { useEffect, useState } from "react"
import { getAllStylists, updateStylist } from "../../Services/stylistServices"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"


export const StylistList = () => {
    const [allStylists, setAllStylists] = useState([])
    const [activate, setActivate] = useState(false)



    useEffect(() => {
        getAllStylists().then(res => setAllStylists(res))
    }, [activate])

    const handleActivate = (e) => {
        const id = e.target.dataset.id

        updateStylist(id).then(() => setActivate(a => !a))
    }
    return (
        <div className="container">
            <div className="d-flex align-items-center">
                <h3 className="m-2">Stylists</h3>
                <Link to={"create"} >add Stylist</Link>
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
                                    {s.isActive? (<button data-id={s.id} onClick={handleActivate} className="btn btn-warning">Deactivate</button>) : (<button  data-id={s.id}  onClick={handleActivate} className="btn btn-info" >Activate</button>) }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}