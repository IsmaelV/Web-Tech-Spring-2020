import React, { Component } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";
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
    showModal: false
  };
  constructor(props) {
    super(props);
    this.constructCard = this.constructCard.bind(this);
    this.handleHideUnhide = this.handleHideUnhide.bind(this);
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
  }

  constructCard(callback) {
    const fullArticle = this.props.article;
    let title = "";
    let description = "";
    let articleUrl = "";
    let date = "";
    let imgSrc = "";
    let full_text = "";

    // ------------------------------
    // ---------- NY Times ----------
    // ------------------------------
    if (this.props.news_source === "nytimes") {
      title = fullArticle.response.docs[0].headline.main;
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

      // Get small portion of body text to show in article view
      full_text = fullArticle.response.content.blocks.body[0].bodyTextSummary;
      description =
        full_text
          .split(". ")
          .slice(0, 4)
          .join(". ") + "...";

      articleUrl = fullArticle.response.content.webUrl;
      date = this.constructDate(
        fullArticle.response.content.webPublicationDate.substr(0, 10)
      );

      // Look for image
      let imgFound = false;
      imgSrc = "";
      for (
        var index = 0;
        index <
        fullArticle.response.content.blocks.main.elements[0].assets.length;
        index++
      ) {
        if (
          fullArticle.response.content.blocks.main.elements[0].assets[index]
            .typeData.width >= 2000
        ) {
          imgSrc =
            fullArticle.response.content.blocks.main.elements[0].assets[index]
              .file;
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
      full_text: full_text
    });
  }

  updateState(data) {
    this.setState(data);
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
      <div>
        <div className="detailedContainer" id="detailedArticleContainer">
          <div className="detailedTitle">
            <span id="titleText">{this.state.title}</span>
          </div>

          <div id="detailedDateShare">
            <div id="detailedDate" className="detailedDateStyle">
              {this.state.date}
            </div>
            <div id="shareButtonContainer">
              <FacebookShareButton
                url={this.state.articleUrl}
                hashtag="#CSCI_571_NewsApp"
                className="detailedShareButton"
                data-tip="Facebook"
              >
                <FacebookIcon round={true} size={30} />
              </FacebookShareButton>

              <TwitterShareButton
                url={this.state.articleUrl}
                hashtags={["CSCI_571_NewsApp"]}
                className="detailedShareButton"
                data-tip="Twitter"
              >
                <TwitterIcon round={true} size={30} />
              </TwitterShareButton>

              <EmailShareButton
                url={this.state.articleUrl}
                subject="#CSCI_571_NewsApp"
                className="detailedShareButton"
                data-tip="Email"
              >
                <EmailIcon round={true} size={30} />
              </EmailShareButton>

              <ReactTooltip effect="solid" />
            </div>
          </div>

          <div id="articleImg">
            <img className="detailedImg" src={this.state.image} alt="Article" />
          </div>

          <div
            id="detailedDescription"
            className="m-3 detailedDescrip"
            onClick={this.handleHideUnhide}
          >
            {this.state.description}
          </div>
          <div
            id="detailedFullText"
            className="m-3 detailedFull hidden"
            onClick={this.handleHideUnhide}
          >
            {this.state.full_text}
          </div>
        </div>
        <div className="commentbox" />
      </div>
    );
  }
}

export default DetailedArticle;
