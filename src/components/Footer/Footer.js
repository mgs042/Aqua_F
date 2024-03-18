
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink>
              Aquametrics
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              About Us
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              Blog
            </NavLink>
          </NavItem>
        </Nav>
        
      </Container>
    </footer>
  );
}

export default Footer;
