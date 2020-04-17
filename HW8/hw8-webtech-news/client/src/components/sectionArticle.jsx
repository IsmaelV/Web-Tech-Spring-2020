import React, { Component } from "react";
import "../styles/sectionArticle.css";

class SectionArticle extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    articleUrl: "",
    image: "",
    section: ""
  };
  constructor(props) {
    super(props);
    this.constructCard = this.constructCard.bind(this);
  }

  constructCard(callback) {
    const fullArticle = this.props.article;
    let section = "";
    let title = "";
    let content = "";
    let articleUrl = "";
    let date = "";
    let imgSrc = "";
    if (this.props.news_source === "nytimes") {
      section = fullArticle.section;
      title = fullArticle.title;
      content = fullArticle.abstract;
      articleUrl = fullArticle.url;
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
      section = fullArticle.sectionName;
      title = fullArticle.webTitle;
      // content = fullArticle.blocks.body[0].bodyTextSummary;
      articleUrl = fullArticle.webUrl;
      date = fullArticle.webPublicationDate.substr(0, 10);

      // Look for image
      //   let imgFound = false;
      //   imgSrc = "";
      //   for (
      //     var index = 0;
      //     index < fullArticle.blocks.main.elements[0].assets.length;
      //     index++
      //   ) {
      //     if (
      //       fullArticle.blocks.main.elements[0].assets[index].typeData.width >=
      //       2000
      //     ) {
      //       imgSrc = fullArticle.blocks.main.elements[0].assets[index].file;
      //       imgFound = true;
      //       break;
      //     }
      //   }
      //   if (!imgFound) {
      //     imgSrc =
      //       "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
      //   }
    }

    callback({
      title: title,
      content: content,
      date: date,
      articleUrl: articleUrl,
      image: imgSrc,
      section: section
    });
  }

  updateState(data) {
    this.setState(data);
  }

  componentDidMount() {
    this.constructCard(data => this.updateState(data));
  }

  render() {
    return (
      <div className="containerStyle">
        <img className="imgStyle" src={this.state.image} alt="Article" />

        <div className="m2 infoStyle">
          <div className="ml-3 titleStyle">{this.state.title}</div>

          <div className="ml-3 contentStyle">{this.state.content}</div>

          <br />

          <div>
            <div className="ml-3 dateStyle">{this.state.date}</div>

            <div className="sectionStyle badge badge-primary">
              {this.state.section}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SectionArticle;
