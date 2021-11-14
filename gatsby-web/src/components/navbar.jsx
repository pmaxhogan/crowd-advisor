import * as React from "react"
import {Nav, Navbar, NavDropdown, Container, FormControl, Form, Button} from "react-bootstrap";
import logo from "../images/logo.png";


class NavbarComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      val: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = props.goBack.bind(this);
  }

  handleSubmit(e){
    const {onSearch} = this.props;
    if(onSearch && this.state.val) onSearch(this.state.val);

    this.setState({val: ""});

    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    return (
        <Navbar bg="dark" variant="dark" expand="xxl">
          <Container>
            <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Logo"
                style={{marginRight: "10px"}}
            />
            <Navbar.Brand onClick={this.goBack}>CrowdAdvisor</Navbar.Brand>
            <Form className="d-flex" onSubmit={this.handleSubmit}>
              <FormControl
                  type="search"
                  placeholder="Search a ticker, stock name..."
                  aria-label="Search"
                  value={this.state.val}
                  onChange={e => this.setState({val: e.target.value})}
              />
              <Button type="submit" variant="outline-success">Search</Button>
            </Form>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
              {/*<Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider/>
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>*/}
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )

  }
}

export default NavbarComponent;
