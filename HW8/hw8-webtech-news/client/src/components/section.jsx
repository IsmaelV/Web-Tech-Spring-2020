import React, { Component } from "react";
import Loading from "./loading";
import AllSectionArticles from "./allSectionArticles";

class Section extends Component {
  constructor(props) {
    super(props);
    this.callAPI = this.callAPI.bind(this);
    this.state = { content: <Loading /> };
  }

  callAPI(callback) {
    let url_to_use = "https://ivillega-nytimes-guardian.wl.r.appspot.com/";
    if (this.props.toggle_status) {
      url_to_use += "guardian/";
    } else {
      url_to_use += "nytimes/";
    }
    url_to_use += this.props.sectionName;

    const xmlreq = new XMLHttpRequest();
    xmlreq.open("GET", url_to_use, true);

    xmlreq.onreadystatechange = function() {
      if (xmlreq.readyState === 4) {
        if (xmlreq.status === 200) {
          callback(JSON.parse(xmlreq.responseText));
        }
      }
    };

    xmlreq.send();
  }

  updateContent(data) {
    this.setState({
      content: (
        <AllSectionArticles
          toggle_status={this.props.toggle_status}
          articles={data}
        />
      )
    });
  }

  componentDidMount() {
    this.callAPI(data => this.updateContent(data));
  }

  render() {
    return <React.Fragment>{this.state.content}</React.Fragment>;
  }
}

export default Section;
