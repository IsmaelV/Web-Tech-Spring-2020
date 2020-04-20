import React, { Component } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { Redirect } from "react-router-dom";
import commentBox from "commentbox.io";
import ReactTooltip from "react-tooltip";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/detailedArticle.css";
import "../styles/standard.css";

class DetailedArticle extends Component {
  state = {
    title: "",
    description: "",
    full_text: "",
    date: "",
    articleUrl: "",
    image: "",
    redirect_url: "",
    article_id: "",
    showModal: false,
    expanded: true
  };
  constructor(props) {
    super(props);
    this.constructCard = this.constructCard.bind(this);
    this.handleHideUnhide = this.handleHideUnhide.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);

    // If no bookmarks created at all yet, create empty list
    if (!localStorage.bookmarked) {
      localStorage.setItem("bookmarked", JSON.stringify({ selected: [] }));
    }
  }

  constructDate(dateString) {
    var all_split = dateString.split("-");
    var year = all_split[0];
    var month = all_split[1];
    var day = all_split[2];

    var monthString = "";
    switch (month) {
      case "01":
        monthString = "January";
        break;
      case "02":
        monthString = "February";
        break;
      case "03":
        monthString = "March";
        break;
      case "04":
        monthString = "April";
        break;
      case "05":
        monthString = "May";
        break;
      case "06":
        monthString = "June";
        break;
      case "07":
        monthString = "July";
        break;
      case "08":
        monthString = "August";
        break;
      case "09":
        monthString = "September";
        break;
      case "10":
        monthString = "October";
        break;
      case "11":
        monthString = "November";
        break;
      case "12":
        monthString = "December";
        break;
      default:
        monthString = "Unknown";
    }
    return day + " " + monthString + " " + year;
  }

  handleHideUnhide() {
    var detailedDescription = document.getElementById("detailedDescription");
    var detailedFullText = document.getElementById("detailedFullText");

    detailedDescription.classList.toggle("hidden");
    detailedFullText.classList.toggle("hidden");
    this.setState({ expanded: !this.state.expanded });
  }

  checkIfBookmarked() {
    var allBookmarked = JSON.parse(localStorage.getItem("bookmarked")).selected;
    for (var b = 0; b < allBookmarked.length; b++) {
      if (allBookmarked[b].id === this.state.article_id) {
        return true;
      }
    }
    return false;
  }

  handleBookmark() {
    var allBookmarks = JSON.parse(localStorage.getItem("bookmarked"));
    if (!this.checkIfBookmarked()) {
      this.setState({ bookmarked: true });
      allBookmarks.selected.push({
        id: this.state.article_id,
        info: this.state
      });
    } else {
      this.setState({ bookmarked: false });
      for (var i = 0; i < allBookmarks.selected.length; i++) {
        if (allBookmarks.selected[i].id === this.state.article_id) {
          allBookmarks.selected.splice(i, 1);
          break;
        }
      }
    }
    localStorage.setItem("bookmarked", JSON.stringify(allBookmarks));
    console.log(allBookmarks.selected);
  }

  constructCard(callback) {
    const fullArticle = this.props.article;
    let title = "";
    let description = "";
    let articleUrl = "";
    let article_id = "";
    let date = "";
    let imgSrc = "";
    let full_text = "";

    // ------------------------------
    // ---------- NY Times ----------
    // ------------------------------
    if (this.props.news_source === "nytimes") {
      title = fullArticle.response.docs[0].headline.main;
      article_id = fullArticle.response.docs[0].web_url;
      description = fullArticle.response.docs[0].abstract;
      full_text = fullArticle.response.docs[0].abstract;
      articleUrl = fullArticle.response.docs[0].web_url;
      date = this.constructDate(
        fullArticle.response.docs[0].pub_date.substr(0, 10)
      );

      // Look for image
      let imgFound = false;
      if (fullArticle.response.docs[0].multimedia != null) {
        for (
          var i = 0;
          i < fullArticle.response.docs[0].multimedia.length;
          i++
        ) {
          if (fullArticle.response.docs[0].multimedia[i].width >= 2000) {
            imgSrc =
              "https://www.nytimes.com/" +
              fullArticle.response.docs[0].multimedia[i].url;
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
      title = fullArticle.response.content.webTitle;
      article_id = fullArticle.response.content.id;

      // Get small portion of body text to show in article view
      full_text = fullArticle.response.content.blocks.body[0].bodyTextSummary;
      description =
        full_text
          .split(". ")
          .slice(0, 4)
          .join(". ") + "...";

      articleUrl = fullArticle.response.content.webUrl;
      // date = this.constructDate(
      //   fullArticle.response.content.webPublicationDate.substr(0, 10)
      // );
      date = fullArticle.response.content.webPublicationDate.substr(0, 10);

      // Look for image
      let imgFound = false;
      imgSrc = "";
      var imgPath = "";
      if (fullArticle.response.content.blocks.main) {
        imgPath = fullArticle.response.content.blocks.main;
      } else {
        imgPath = fullArticle.response.content.blocks.body[0];
      }
      for (var g = 0; g < imgPath.elements[0].assets.length; g++) {
        if (imgPath.elements[0].assets[g].typeData.width >= 2000) {
          imgSrc = imgPath.elements[0].assets[g].file;
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
      description: description,
      date: date,
      articleUrl: articleUrl,
      image: imgSrc,
      full_text: full_text,
      article_id: article_id
    });
  }

  updateState(data) {
    this.setState(data);
    this.setState({ bookmarked: this.checkIfBookmarked() });
  }

  componentDidMount() {
    this.constructCard(data => this.updateState(data));
    this.removeCommentBox = commentBox("5679770524188672-proj");
  }

  componentWillUnmount() {
    this.removeCommentBox();
  }

  render() {
    if (this.state.goToDetailedView) {
      return <Redirect to={this.state.redirect_url} />;
    }
    return (
      <React.Fragment>
        <Container
          fluid
          className="detailedContainer"
          id="detailedArticleContainer"
        >
          <Row id="detailedTitle">{this.state.title}</Row>

          <Row noGutters={true} id="detailedDateShare">
            <Col id="detailedDate" xs="4" sm="4" md="8" lg="8" xl="8">
              {this.state.date}
            </Col>
            <Col id="shareButtonContainer" xs="7" sm="7" md="3" lg="3" xl="3">
              <FacebookShareButton
                url={this.state.articleUrl}
                hashtag="#CSCI_571_NewsApp"
                className="detailedShareButton"
                data-tip="Facebook"
              >
                <FacebookIcon round={true} size={"3.25vh"} />
              </FacebookShareButton>

              <TwitterShareButton
                url={this.state.articleUrl}
                hashtags={["CSCI_571_NewsApp"]}
                className="detailedShareButton"
                data-tip="Twitter"
              >
                <TwitterIcon round={true} size={"3.25vh"} />
              </TwitterShareButton>

              <EmailShareButton
                url={this.state.articleUrl}
                subject="#CSCI_571_NewsApp"
                className="detailedShareButton"
                data-tip="Email"
              >
                <EmailIcon round={true} size={"3.25vh"} />
              </EmailShareButton>

              {/* <ReactTooltip effect="solid" /> */}
            </Col>
            <Col id="bookmarkContainer" xs="1" sm="1" md="1" lg="1" xl="1">
              {!this.checkIfBookmarked() ? (
                <React.Fragment>
                  <FaRegBookmark
                    data-tip="Bookmark"
                    onClick={this.handleBookmark}
                  />
                  <ReactTooltip effect="solid" />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <FaBookmark
                    data-tip="Bookmark"
                    onClick={this.handleBookmark}
                  />{" "}
                  <ReactTooltip effect="solid" />{" "}
                </React.Fragment>
              )}
            </Col>
          </Row>

          <Row id="articleImg">
            <img className="detailedImg" src={this.state.image} alt="Article" />
          </Row>

          <Row
            id="detailedDescription"
            className="m-3 detailedDescrip"
            onClick={this.handleHideUnhide}
          >
            {this.state.description}
          </Row>
          <Row
            id="detailedFullText"
            className="m-3 detailedFull hidden"
            onClick={this.handleHideUnhide}
          >
            {this.state.full_text}
          </Row>
          <Row>
            <Col xs="10" sm="11" md="11" lg="11" xl="11"></Col>
            <Col
              xs="2"
              sm="1"
              md="1"
              lg="1"
              xl="1"
              id="expandButton"
              onClick={this.handleHideUnhide}
            >
              {this.state.expanded ? <MdExpandMore /> : <MdExpandLess />}
            </Col>
          </Row>
        </Container>
        <div className="commentbox" />
      </React.Fragment>
    );
  }
}

export default DetailedArticle;
