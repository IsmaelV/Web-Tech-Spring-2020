import React, { Component } from "react";

import AsyncSelect from "react-select/async";

function bingAutosuggest(query) {
  var endpoint = "https://api.cognitive.microsoft.com/bing/v7.0/Suggestions";

  var request = new XMLHttpRequest();

  request.open("GET", endpoint + "?=q=" + encodeURIComponent(query));
  request.setRequestHeader(
    "Ocp-Apim-Subscription-Key",
    "68b8a16bc26c4d2ba2e8e1f7c08730e0"
  );
  request.onreadystatechange = function() {
    if (xmlreq.readyState === 4) {
      if (xmlreq.status === 200) {
        receive_sources(JSON.parse(xmlreq.responseText));
        populate_source("all");
        format_date();
      }
    }
  };
  request.send();
}

const filterKeyword = inputValue => {
  return colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterKeyword(inputValue));
  }, 1000);
};

export default class AsyncSearch extends Component {
  state = { inputValue: "" };
  handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, "");
    this.setState({ inputValue });
    return inputValue;
  };
  render() {
    return (
      <div>
        {/* <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
          onInputChange={this.handleInputChange}
        /> */}
        {bingAutosuggest("para")}
      </div>
    );
  }
}
