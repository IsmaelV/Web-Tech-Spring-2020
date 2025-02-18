import React from "react";
import { Navbar, Nav, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import SwitchToggle from "./switchToggle";
import { NavLink } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import bingAutosuggest from "../utils/autoSuggest";
import _ from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/nav.css";

class MyNav extends React.Component {
  state = { suggestions: [], atFavoritePage: false };

  constructor(props) {
    super(props);
    this.getAutoSuggestions = this.getAutoSuggestions.bind(this);
    this.toggleSliderOn = this.toggleSliderOn.bind(this);
    this.toggleSliderOff = this.toggleSliderOff.bind(this);
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

  toggleSliderOn() {
    this.setState({ atFavoritePage: false });
  }
  toggleSliderOff() {
    this.setState({ atFavoritePage: true });
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
            <Nav.Link as={NavLink} to="/home" onClick={this.toggleSliderOn}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/world" onClick={this.toggleSliderOn}>
              World
            </Nav.Link>
            <Nav.Link as={NavLink} to="/politics" onClick={this.toggleSliderOn}>
              Politics
            </Nav.Link>
            <Nav.Link as={NavLink} to="/business" onClick={this.toggleSliderOn}>
              Business
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/technology"
              onClick={this.toggleSliderOn}
            >
              Technology
            </Nav.Link>
            <Nav.Link as={NavLink} to="/sports" onClick={this.toggleSliderOn}>
              Sports
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              as={NavLink}
              to="/favorites"
              onClick={this.toggleSliderOff}
              data-tip="Bookmark"
            >
              <FaRegBookmark
                color="white"
                size="2vh"
                style={{ marginRight: "1vh" }}
              />
            </Nav.Link>
            {!this.state.atFavoritePage && (
              <SwitchToggle
                toggle_status={this.props.toggle_status}
                handleChange={this.props.handleChange}
              />
            )}
          </Nav>
          {this.state.search && (
            <Redirect to={"/search/" + this.state.searchVal} />
          )}
        </Navbar.Collapse>
        <ReactTooltip effect="solid" />
      </Navbar>
    );
  }
}

export default MyNav;
