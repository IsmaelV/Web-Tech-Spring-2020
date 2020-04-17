import React, { Component } from "react";
import SectionArticle from "./sectionArticle";

class AllSectionArticles extends Component {
  constructor(props) {
    super(props);
    if (this.props.toggle_status) {
      this.state = {
        all_articles: this.props.articles.response.results,
        news: "guardian"
      };
    } else {
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
