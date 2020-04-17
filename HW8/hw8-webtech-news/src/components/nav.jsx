import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class MyNav extends Component {
  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
        <Nav className="mr-auto">
          <Nav.Link href="home">Home</Nav.Link>
          <Nav.Link href="world">World</Nav.Link>
          <Nav.Link href="politics">Politics</Nav.Link>
          <Nav.Link href="business">Business</Nav.Link>
          <Nav.Link href="technology">Technology</Nav.Link>
          <Nav.Link href="sports">Sports</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default MyNav;
