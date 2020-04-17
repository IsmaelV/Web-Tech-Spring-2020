import React, { Component } from "react";
import Switch from "react-switch";
import "bootstrap/dist/css/bootstrap.min.css";

class SwitchToggle extends Component {
  constructor() {
    super();
    this.state = { checked: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <label>
        <span className="text-white">NY Times</span>
        <Switch
          onChange={this.handleChange}
          checked={this.state.checked}
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
