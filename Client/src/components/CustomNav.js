import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navbar, Nav } from "react-bootstrap";
import Logout from "./Logout";
export default function CustomNav() {
  const { LoggedIn } = useContext(AuthContext);
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='/'>Home</Nav.Link>
          {LoggedIn === false && (
            <>
              <Nav.Link href='/register'>Register</Nav.Link>
              <Nav.Link href='/login'>Login</Nav.Link>
            </>
          )}
          {LoggedIn === true && (
            <>
              <Nav.Link href='/customer'>Customers</Nav.Link>
              <Logout />
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
