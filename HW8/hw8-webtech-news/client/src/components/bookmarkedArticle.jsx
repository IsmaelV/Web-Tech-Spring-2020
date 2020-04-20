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
    showModal: false,
    goToDetailedView: false
  };

  constructor(props) {
    super(props);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleContainerClick = this.handleContainerClick.bind(this);
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
    switch (this.props.section) {
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
    var source_badge_classes = "sectionStyle badge badge-";
    switch (this.props.news_source) {
      case "nytimes":
        source_badge_classes += "light";
        break;
      default:
        source_badge_classes += "dark";
    }

    if (this.state.goToDetailedView) {
      return <Redirect to={this.props.redirect_url} />;
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
              <span id="cardTitle">{this.props.title}</span>
              <MdShare id="shareButton" onClick={this.handleOpenModal} />
            </Card.Title>
            <div style={myCardStyle}>
              <Card.Img id="articleImg" src={this.props.image} />
            </div>
            <div id="contentFooter">
              <div id="contentDate" className="ml-3 dateStyle">
                {this.props.date}
              </div>

              <div id="contentBadge" className={badge_classes}>
                {this.props.section}
              </div>
              <div id="sourceBadge" className={source_badge_classes}>
                {this.props.news_source.toUpperCase()}
              </div>
            </div>
          </Card.Body>
        </Card>
        <ShareModal
          id="modalShare"
          showModal={this.state.showModal}
          title={this.props.title}
          handleCloseModal={this.handleCloseModal}
          webUrl={this.props.articleUrl}
        />
      </Col>
    );
  }
}

export default SearchArticle;
