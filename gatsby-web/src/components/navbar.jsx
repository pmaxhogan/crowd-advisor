import * as React from "react"
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap"

export default function NavbarComponent() {

  return (
    <Navbar bg="dark" variant="dark" expand="xxl">
      <Container>
        <img
          src="/gatsby-web/src/images/logo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Logo"
        />
        <Navbar.Brand href="#home">FinAnal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

}
