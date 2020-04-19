import React, { Component } from "react";
import { MdShare } from "react-icons/md";
import ShareModal from "./shareModal";
import { Redirect } from "react-router-dom";
import "../styles/sectionArticle.css";
import { Container, Row, Col } from "react-bootstrap";

class SectionArticle extends Component {
  state = {
    title: "",
    content: "",
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
    const fullArticle = this.props.article;
    let section = "";
    let title = "";
    let content = "";
    let articleUrl = "";
    let date = "";
    let imgSrc = "";
    let articleId = "";
    if (this.props.news_source === "nytimes") {
      section = fullArticle.section;
      title = fullArticle.title;
      content = fullArticle.abstract;
      articleUrl = fullArticle.url;
      articleId = fullArticle.url;
      date = fullArticle.published_date.substr(0, 10);

      // Look for image
      let imgFound = false;
      if (fullArticle.multimedia != null) {
        for (let index = 0; index < fullArticle.multimedia.length; index++) {
          if (fullArticle.multimedia[index].width >= 2000) {
            imgSrc = fullArticle.multimedia[index].url;
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
    } else {
      section = fullArticle.sectionId;
      title = fullArticle.webTitle;

      // Get small portion of body text to show in article view
      content = fullArticle.blocks.body[0].bodyTextSummary;
      content =
        content
          .split(". ")
          .slice(0, 4)
          .join(". ") + "...";

      articleUrl = fullArticle.webUrl;
      articleId = fullArticle.id;
      date = fullArticle.webPublicationDate.substr(0, 10);

      // Look for image
      let imgFound = false;
      imgSrc = "";
      for (
        var index = 0;
        index < fullArticle.blocks.main.elements[0].assets.length;
        index++
      ) {
        if (
          fullArticle.blocks.main.elements[0].assets[index].typeData.width >=
          2000
        ) {
          imgSrc = fullArticle.blocks.main.elements[0].assets[index].file;
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
      content: content,
      date: date,
      articleUrl: articleUrl,
      image: imgSrc,
      section: section,
      redirect_url: "/article_view/" + this.props.news_source + "/" + articleId,
      article_id: articleId
    });
  }

  updateState(data) {
    this.setState(data);
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
      e.target.getAttribute("id") === "articleContainer" ||
      e.target.getAttribute("id") === "articleImg" ||
      e.target.getAttribute("id") === "rightSide" ||
      e.target.getAttribute("id") === "titleText" ||
      e.target.getAttribute("id") === "contentText" ||
      e.target.getAttribute("id") === "contentDate" ||
      e.target.getAttribute("id") === "contentBadge"
    ) {
      console.log(this.state.redirect_url);
      console.log(this.state.article_id);
      this.setState({ goToDetailedView: true });
    }
  }

  componentDidMount() {
    this.constructCard(data => this.updateState(data));
  }

  render() {
    // Change badge background depending on section
    var badge_classes = "sectionStyle badge badge-";
    switch (this.state.section) {
      case "world":
        badge_classes += "world";
        break;
      case "politics":
        badge_classes += "politics";
        break;
      case "business":
        badge_classes += "business";
        break;
      case "technology":
        badge_classes += "tech";
        break;
      case "sports":
      case "sport":
        badge_classes += "warning";
        break;
      default:
        badge_classes += "secondary";
    }

    if (this.state.goToDetailedView) {
      return <Redirect to={this.state.redirect_url} />;
    }

    return (
      <Container
        fluid
        className="containerStyle"
        id="articleContainer"
        onClick={event => this.handleContainerClick(event)}
      >
        <Row className="rowContainer">
          <Col className="imageContainer">
            <img
              className="imgStyle"
              id="articleImg"
              src={this.state.image}
              alt="Article"
            />
          </Col>
          <Col sm="12" md="8" lg="8" xl="8" id="rightSide">
            <div className="m2 infoStyle">
              <div className="ml-3 titleStyle">
                <span id="titleText">{this.state.title}</span>
                <MdShare id="shareButton" onClick={this.handleOpenModal} />
              </div>

              <div id="contentText" className="ml-3 contentStyle">
                {this.state.content}
              </div>
              <br />
              <div id="contentFooter">
                <div id="contentDate" className="ml-3 dateStyle">
                  {this.state.date}
                </div>

                <div id="contentBadge" className={badge_classes}>
                  {this.state.section.toUpperCase()}
                </div>
              </div>
              <br />
            </div>
          </Col>
        </Row>
        <ShareModal
          id="modalShare"
          showModal={this.state.showModal}
          title={this.state.title}
          handleCloseModal={this.handleCloseModal}
          webUrl={this.state.articleUrl}
        />
      </Container>
    );
  }
}

export default SectionArticle;
