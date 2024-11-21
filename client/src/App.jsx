
import "bootstrap/dist/css/bootstrap.css";
import './App.css'
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { Outlet} from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar color="info" expand="sm" className="" >
        <Nav className="w-100" navbar>
          <NavbarBrand href="/">Hillarys Hair Care</NavbarBrand>
          <NavItem className="d-flex">
            <NavLink className="m-2" href="/">Appointments</NavLink>
            
          </NavItem>
        </Nav>
      </Navbar>
      <Outlet />
    </>
  );
}

export default App
