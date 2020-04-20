import React, { Component } from "react";
import BookmarkedArticle from "./bookmarkedArticle";
import { Container, Row } from "react-bootstrap";
import "../styles/standard.css";

class AllBookmarkedArticles extends Component {
  constructor(props) {
    super(props);

    // If no bookmarks created at all yet, create empty list
    if (!localStorage.bookmarked) {
      localStorage.setItem("bookmarked", JSON.stringify({ selected: [] }));
    }
    var all_articles = JSON.parse(localStorage.getItem("bookmarked")).selected;
    this.state = { all_articles: all_articles };
  }
  render() {
    var favoritesStyle = {
      fontSize: "4vh"
    };
    return (
      <Container fluid>
        <div style={favoritesStyle}>Favorites</div>
        <Row>
          {JSON.parse(localStorage.getItem("bookmarked")).selected.length >
          0 ? (
            this.state.all_articles.map(article => (
              <BookmarkedArticle
                news_source={article.news_source}
                section={article.info.section}
                title={article.info.title}
                image={article.info.image}
                date={article.info.date}
                url={article.info.articleUrl}
                redirect_url={
                  "/article_view/" + article.news_source + "/" + article.id
                }
              />
            ))
          ) : (
            <div>There are no results</div>
          )}
        </Row>
      </Container>
    );
  }
}

export default AllBookmarkedArticles;
