import React, { Component } from "react";
import AllSearchArticles from "./allSearchArticles";
import Loading from "./loading";

class Search extends Component {
  constructor(props) {
    super(props);
    this.callSearchAPI = this.callSearchAPI.bind(this);
    var query = this.props.location.pathname
      .split("/")
      .slice(2, this.props.location.pathname.split("/").length)
      .join("/");
    this.state = { q: query, content: <Loading /> };
  }

  callSearchAPI(query, news_source, callback) {
    var url_to_use =
      "https://ivillega-nytimes-guardian.wl.r.appspot.com/" +
      news_source +
      "/search/" +
      query;

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
      content: <AllSearchArticles articles={data.response.results} />
    });
  }

  componentDidMount() {
    this.callSearchAPI(this.state.q, "guardian", data =>
      this.updateContent(data)
    );
  }

  render() {
    return <React.Fragment>{this.state.content}</React.Fragment>;
  }
}

export default Search;
