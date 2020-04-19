import React from "react";
import Modal from "react-bootstrap/Modal";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";
import "../styles/shareModal.css";
import "../styles/standard.css";

const ShareModal = props => {
  return (
    <Modal show={props.showModal} onHide={props.handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title className="titleTextModal">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="centering shareViaModal">Share via</div>

        <div className="shareContainer">
          <FacebookShareButton
            url={props.webUrl}
            hashtag="#CSCI_571_NewsApp"
            className="shareButton"
          >
            <FacebookIcon round={true} />
          </FacebookShareButton>

          <TwitterShareButton
            url={props.webUrl}
            hashtags={["CSCI_571_NewsApp"]}
            className="shareButton"
          >
            <TwitterIcon round={true} />
          </TwitterShareButton>

          <EmailShareButton
            url={props.webUrl}
            subject="#CSCI_571_NewsApp"
            className="shareButton"
          >
            <EmailIcon round={true} />
          </EmailShareButton>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShareModal;
