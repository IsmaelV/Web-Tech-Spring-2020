import React, { Component } from "react";
import { MdShare } from "react-icons/md";
import ShareModal from "./shareModal";
import { Redirect } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Col } from "react-bootstrap";
import "../styles/sectionArticle.css";
import "../styles/searchArticle.css";

class SearchArticle extends Component {
  state = {
    title: "",
    date: "",
    articleUrl: "",
    image: "",
    section: "",
    redirect_url: "",
    article_id: "",
    showModal: false
  };

  constructor(props) {
    super(props);
    this.constructCard = this.constructCard.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleContainerClick = this.handleContainerClick.bind(this);
  }

  constructCard(callback) {
    const fullArticle = this.props.article.article;
    let section = "";
    let title = "";
    let articleUrl = "";
    let date = "";
    let imgSrc = "";
    let articleId = "";

    // ------------------------------
    // ---------- NY Times ----------
    // ------------------------------
    if (this.props.article.news_source === "nytimes") {
      section = fullArticle.news_desk.toUpperCase();
      title = fullArticle.headline.main;
      articleUrl = fullArticle.web_url;
      articleId = fullArticle.web_url;
      date = fullArticle.pub_date.substr(0, 10);

      // Look for image
      let imgFound = false;
      if (fullArticle.multimedia != null) {
        for (var index = 0; index < fullArticle.multimedia.length; index++) {
          if (fullArticle.multimedia[index].width >= 2000) {
            imgSrc = "https://nytimes.com/" + fullArticle.multimedia[index].url;
            imgFound = true;
            break;
          }
        }
        if (!imgFound) {
          imgSrc =
            "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        }
      } else {
        imgSrc =
          "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
      }
    }
    // ------------------------------
    // ---------- Guardian ----------
    // ------------------------------
    else {
      section = fullArticle.sectionId.toUpperCase();
      title = fullArticle.webTitle;
      articleUrl = fullArticle.webUrl;
      articleId = fullArticle.id;
      date = fullArticle.webPublicationDate.substr(0, 10);

      // Look for image
      let imgFound = false;
      imgSrc = "";
      for (
        var g = 0;
        g < fullArticle.blocks.main.elements[0].assets.length;
        g++
      ) {
        if (
          fullArticle.blocks.main.elements[0].assets[g].typeData.width >= 2000
        ) {
          imgSrc = fullArticle.blocks.main.elements[0].assets[g].file;
          imgFound = true;
          break;
        }
      }
      if (!imgFound) {
        imgSrc =
          "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
      }
    }

    callback({
      title: title,
      date: date,
      articleUrl: articleUrl,
      image: imgSrc,
      section: section,
      redirect_url:
        "/article_view/" + this.props.article.news_source + "/" + articleId,
      article_id: articleId
    });
  }

  updateState(data) {
    this.setState(data);
  }

  componentDidMount() {
    this.constructCard(data => this.updateState(data));
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }
  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleContainerClick(e) {
    if (e.target.getAttribute("id") === "shareButton") {
      return true;
    } else if (
      e.target.getAttribute("id") === "cardContainer" ||
      e.target.getAttribute("id") === "cardBody" ||
      e.target.getAttribute("id") === "articleImg" ||
      e.target.getAttribute("id") === "cardTitle" ||
      e.target.getAttribute("id") === "contentText" ||
      e.target.getAttribute("id") === "contentDate" ||
      e.target.getAttribute("id") === "contentBadge" ||
      e.target.getAttribute("id") === "contentFooter"
    ) {
      this.setState({ goToDetailedView: true });
    }
  }

  render() {
    // Change badge background depending on section
    var badge_classes = "sectionStyle badge badge-";
    switch (this.state.section) {
      case "WORLD":
        badge_classes += "world";
        break;
      case "POLITICS":
        badge_classes += "politics";
        break;
      case "BUSINESS":
        badge_classes += "business";
        break;
      case "TECHNOLOGY":
        badge_classes += "tech";
        break;
      case "SPORTS":
      case "SPORT":
        badge_classes += "warning";
        break;
      default:
        badge_classes += "secondary";
    }

    if (this.state.goToDetailedView) {
      return <Redirect to={this.state.redirect_url} />;
    }

    var myCardStyle = {
      marginBottom: "1.5vh"
    };

    return (
      <Col sm="12" md="6" lg="3" xl="3" id="cardContainer">
        <Card
          style={myCardStyle}
          onClick={event => this.handleContainerClick(event)}
        >
          <Card.Body id="cardBody">
            <Card.Title>
              <span id="cardTitle">{this.state.title}</span>
              <MdShare id="shareButton" onClick={this.handleOpenModal} />
            </Card.Title>
            <div style={myCardStyle}>
              <Card.Img id="articleImg" src={this.state.image} />
            </div>
            <div id="contentFooter">
              <div id="contentDate" className="ml-3 dateStyle">
                {this.state.date}
              </div>

              <div id="contentBadge" className={badge_classes}>
                {this.state.section}
              </div>
            </div>
          </Card.Body>
        </Card>
        <ShareModal
          id="modalShare"
          showModal={this.state.showModal}
          title={this.state.title}
          handleCloseModal={this.handleCloseModal}
          webUrl={this.state.articleUrl}
        />
      </Col>
    );
  }
}

export default SearchArticle;
