import React, { Component } from "react";
import Loading from "./loading";
import DetailedArticle from "./detailedArticle";

class DetailedView extends Component {
  constructor(props) {
    super(props);
    this.callAPI = this.callAPI.bind(this);
    this.state = { content: <Loading /> };
  }

  callAPI(callback) {
    let url_to_use = "https://ivillega-nytimes-guardian.wl.r.appspot.com/";
    var endOfURL = "";
    var news_source = "";

    // Switch the /news_source/ and /article_view/ positions for valid url
    if (this.props.location.pathname.split("/", 3)[2] === "guardian") {
      url_to_use += "guardian/article_view/";
      endOfURL = this.props.location.pathname.replace(
        "/article_view/guardian/",
        ""
      );
      news_source = "guardian";
    } else {
      url_to_use += "nytimes/article_view/";
      endOfURL = this.props.location.pathname.replace(
        "/article_view/nytimes/",
        ""
      );
      news_source = "nytimes";
    }
    url_to_use += encodeURIComponent(endOfURL); // Encode URL to be valid

    const xmlreq = new XMLHttpRequest();
    xmlreq.open("GET", url_to_use, true);

    xmlreq.onreadystatechange = function() {
      if (xmlreq.readyState === 4) {
        if (xmlreq.status === 200) {
          callback([JSON.parse(xmlreq.responseText), news_source]);
        }
      }
    };

    xmlreq.send();
  }

  updateContent(data) {
    this.setState({
      content: <DetailedArticle article={data[0]} news_source={data[1]} />
    });
  }

  componentDidMount() {
    this.callAPI(data => this.updateContent(data));
  }

  render() {
    return <React.Fragment>{this.state.content}</React.Fragment>;
  }
}

export default DetailedView;
