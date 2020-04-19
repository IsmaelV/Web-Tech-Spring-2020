import React from "react";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import SwitchToggle from "./switchToggle";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const MyNav = props => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      </Form>
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/home">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/world">
          World
        </Nav.Link>
        <Nav.Link as={NavLink} to="/politics">
          Politics
        </Nav.Link>
        <Nav.Link as={NavLink} to="/business">
          Business
        </Nav.Link>
        <Nav.Link as={NavLink} to="/technology">
          Technology
        </Nav.Link>
        <Nav.Link as={NavLink} to="/sports">
          Sports
        </Nav.Link>
      </Nav>
      <SwitchToggle
        toggle_status={props.toggle_status}
        handleChange={props.handleChange}
      />
    </Navbar>
  );
};

export default MyNav;
