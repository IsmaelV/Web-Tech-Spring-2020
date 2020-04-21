import React, { Component } from "react";
import SectionArticle from "./sectionArticle";
import "../styles/standard.css";

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
      var nytimesArticles = [];
      for (var i = 0; i < this.props.articles.results.length; i++) {
        if (nytimesArticles.length === 10) {
          break;
        }
        if (
          this.props.articles.results[i].section &&
          this.props.articles.results[i].title &&
          this.props.articles.results[i].published_date &&
          this.props.articles.results[i].abstract
        ) {
          nytimesArticles.push(this.props.articles.results[i]);
        }
      }
      this.state = {
        all_articles: nytimesArticles,
        news: "nytimes"
      };
    }
  }

  render() {
    const styles = {
      width: "100%",
      height: "100%",
      margin: "0%"
    };
    return (
      <div style={styles}>
        {this.state.all_articles.map(article => (
          <SectionArticle news_source={this.state.news} article={article} />
        ))}
      </div>
    );
  }
}

export default AllSectionArticles;
