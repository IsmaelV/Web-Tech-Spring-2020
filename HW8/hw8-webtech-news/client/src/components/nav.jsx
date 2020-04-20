import React from "react";
import { Navbar, Nav, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import SwitchToggle from "./switchToggle";
import { NavLink } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa";
import bingAutosuggest from "../utils/autoSuggest";
import _ from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/nav.css";

class MyNav extends React.Component {
  state = { suggestions: [] };

  constructor(props) {
    super(props);
    this.getAutoSuggestions = this.getAutoSuggestions.bind(this);
  }

  getAutoSuggestions(data) {
    var listOfSuggestions = data.suggestionGroups[0].searchSuggestions;
    var suggestionList = [];
    for (var index = 0; index < listOfSuggestions.length; index++) {
      var toPut = listOfSuggestions[index].displayText;
      suggestionList.push({ label: toPut, value: toPut });
    }
    this.setState({
      suggestions: suggestionList,
      searchVal: "",
      search: false
    });
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="bg-custom-color">
        <Form inline>
          <Select
            options={this.state.suggestions}
            placeholder="Enter Keyword ..."
            className="searchBar"
            noOptionsMessage={() => "No matches"}
            loadingMessage={() => "Loading..."}
            onInputChange={_.debounce(
              inputVal => bingAutosuggest(inputVal, this.getAutoSuggestions),
              700
            )}
            onChange={input =>
              this.setState({ searchVal: input.value, search: true })
            }
          />
        </Form>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
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
          <Nav>
            <Nav.Link as={NavLink} to="/favorites">
              <FaRegBookmark
                color="white"
                size="2vh"
                style={{ marginRight: "1vh" }}
              />
            </Nav.Link>
            <SwitchToggle
              toggle_status={this.props.toggle_status}
              handleChange={this.props.handleChange}
            />
          </Nav>
          {this.state.search && (
            <Redirect to={"/search/" + this.state.searchVal} />
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MyNav;
