
import "bootstrap/dist/css/bootstrap.css";
import './App.css'
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { Outlet} from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar color="info" expand="sm" className="" >
        <Nav className="w-100" navbar>
          <NavbarBrand href="/appointments">Hillarys Hair Care</NavbarBrand>
          <NavItem className="d-flex">
            <NavLink className="m-2" href="/appointments">Appointments</NavLink>
            <NavLink className="m-2" href="/appointments/create">Create Appointment</NavLink>
            <NavLink className="m-2" href="/stylists">Stylists</NavLink>
            <NavLink className="m-2" href="/customers">Customer</NavLink>
            
          </NavItem>
        </Nav>
      </Navbar>
      <Outlet />
    </>
  );
}

export default App
