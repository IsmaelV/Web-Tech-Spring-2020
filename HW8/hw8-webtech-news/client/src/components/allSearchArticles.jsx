import React, { Component } from "react";
import SearchArticle from "./searchArticle";
import { Container, Row } from "react-bootstrap";

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

    var first_row = all_articles.slice(0, 4);
    var mid_row = all_articles.slice(4, 8);
    var last_row = all_articles.slice(8, 10);

    this.state = {
      all_articles: all_articles,
      first_row: first_row,
      mid_row: mid_row,
      last_row: last_row
    };
  }

  render() {
    var resultsStyle = {
      fontSize: "4vh"
    };

    return (
      <Container fluid>
        <div style={resultsStyle}>Results</div>
        <Row>
          {this.state.first_row.map(fArti => (
            <SearchArticle article={fArti} />
          ))}
        </Row>
        <Row>
          {this.state.mid_row.map(mArti => (
            <SearchArticle article={mArti} />
          ))}
        </Row>
        <Row>
          {this.state.last_row.map(lArti => (
            <SearchArticle article={lArti} />
          ))}
        </Row>
      </Container>
    );
  }
}

export default AllSearchArticles;
