import React, { Component } from "react";
import SectionArticle from "./sectionArticle";

class AllSectionArticles extends Component {
  constructor(props) {
    super(props);
    if (this.props.toggle_status) {
      // for (var k in Object.keys(this.props.articles.response.results)) {  // This is to remove error of no key in console
      //   this.props.articles.response.results.k.k = String(k);
      // }
      this.state = {
        all_articles: this.props.articles.response.results,
        news: "guardian"
      };
    } else {
      // for (var key in Object.keys(this.props.articles.results)) {  // This is to remove error of no key in console
      //   this.props.articles.results.key.key = String(key);
      // }
      this.state = {
        all_articles: this.props.articles.results,
        news: "nytimes"
      };
    }
  }

  render() {
    return (
      <div>
        {this.state.all_articles.map(article => (
          <SectionArticle news_source={this.state.news} article={article} />
        ))}
      </div>
    );
  }
}

export default AllSectionArticles;
