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

    this.handleRemoveBookmark = this.handleRemoveBookmark.bind(this);
  }

  handleRemoveBookmark(id_to_remove) {
    var allBookmarks = JSON.parse(localStorage.getItem("bookmarked"));
    for (var i = 0; i < allBookmarks.selected.length; i++) {
      if (allBookmarks.selected[i].id === id_to_remove) {
        allBookmarks.selected.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("bookmarked", JSON.stringify(allBookmarks));
    this.setState({ all_articles: allBookmarks });
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
                id={article.id}
                onRemoveBookmark={this.handleRemoveBookmark}
              />
            ))
          ) : (
            <h1>You have no saved articles</h1>
          )}
        </Row>
      </Container>
    );
  }
}

export default AllBookmarkedArticles;
