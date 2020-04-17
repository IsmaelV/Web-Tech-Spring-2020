import React, { Component } from "react";
import Switch from "react-switch";
import "bootstrap/dist/css/bootstrap.min.css";

class SwitchToggle extends Component {
  render() {
    return (
      <label>
        <span className="text-white">NY Times</span>
        <Switch
          onChange={this.props.handleChange}
          checked={this.props.toggle_status}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor={"#037ffc"}
        />
        <span className="text-white">The Guardian</span>
      </label>
    );
  }
}

export default SwitchToggle;
