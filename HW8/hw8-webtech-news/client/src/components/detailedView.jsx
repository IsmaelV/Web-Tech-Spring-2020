import React, { Component } from "react";
import Loading from "./loading";

class DetailedView extends Component {
  constructor(props) {
    super(props);
    this.callAPI = this.callAPI.bind(this);
    this.state = { content: <Loading /> };
  }

  callAPI(callback) {
    let url_to_use = "https://ivillega-nytimes-guardian.wl.r.appspot.com/";
    var endOfURL = "";

    // Switch the /news_source/ and /article_view/ positions for valid url
    if (this.props.location.pathname.split("/", 3)[2] === "guardian") {
      url_to_use += "guardian/article_view/";
      endOfURL = this.props.location.pathname.replace(
        "/article_view/guardian/",
        ""
      );
    } else {
      url_to_use += "nytimes/article_view/";
      endOfURL = this.props.location.pathname.replace(
        "/article_view/nytimes/",
        ""
      );
    }
    url_to_use += encodeURIComponent(endOfURL); // Encode URL to be valid

    const xmlreq = new XMLHttpRequest();
    xmlreq.open("GET", url_to_use, true);

    xmlreq.onreadystatechange = function() {
      if (xmlreq.readyState === 4) {
        if (xmlreq.status === 200) {
          callback(xmlreq.responseText);
        }
      }
    };

    xmlreq.send();
  }

  updateContent(data) {
    this.setState({ content: data });
  }

  componentDidMount() {
    this.callAPI(data => this.updateContent(data));
  }

  render() {
    return <React.Fragment>{this.state.content}</React.Fragment>;
  }
}

export default DetailedView;
