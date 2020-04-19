import React, { Component } from "react";
import SearchArticle from "./searchArticle";

class AllSearchArticles extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);
    const guardian_articles = this.props.articles;
    var all_articles = [];
    if (guardian_articles.length > 0) {
      for (var g = 0; g < guardian_articles.length; g++) {
        all_articles.push({
          news_source: "guardian",
          article: guardian_articles[g]
        });
      }
    }

    this.state = { all_articles: all_articles };
  }

  render() {
    return (
      <div>
        {this.state.all_articles.map(article => (
          <SearchArticle article={article} />
        ))}
      </div>
    );
  }
}

export default AllSearchArticles;
