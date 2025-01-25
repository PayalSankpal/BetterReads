import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function BetterReadsNavbar() {


  return (
    <Navbar bg="light" expand="lg" fixed="top">
  <Container>
    <Navbar.Brand href="/" style={{ fontSize: "1.5rem" }}>BetterReads</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/to-be-read" style={{ fontSize: "1rem" }}>To Be Read</Nav.Link>
        <Nav.Link as={Link} to="/reading" style={{ fontSize: "1rem" }}>Reading</Nav.Link>
        <Nav.Link as={Link} to="/read" style={{ fontSize: "1rem" }}>Read</Nav.Link>
        <Nav.Link as={Link} to="/authors" style={{ fontSize: "1rem" }}>Authors</Nav.Link> 
        <Nav.Link as={Link} to="/follow-users" style={{ fontSize: "1rem" }}>Follow Users</Nav.Link> 
        <NavDropdown title="Profile" id="basic-nav-dropdown" style={{ fontSize: "1rem" }}>
          <NavDropdown.Item as={Link} to="/profile" style={{ fontSize: "1rem" }}>View Profile</NavDropdown.Item>
          <NavDropdown.Item href="#settings" style={{ fontSize: "1rem" }}>Settings</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#logout" style={{ fontSize: "1rem" }}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
}

export default BetterReadsNavbar;
