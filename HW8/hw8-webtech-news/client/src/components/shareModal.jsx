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

const ShareModal = props => {
  return (
    <Modal show={props.showModal} onHide={props.handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="centering">Share via</div>

        <FacebookShareButton url={props.webUrl} hashtag="#CSCI_571_NewsApp">
          <FacebookIcon round={true} />
        </FacebookShareButton>

        <TwitterShareButton url={props.webUrl} hashtags={["CSCI_571_NewsApp"]}>
          <TwitterIcon round={true} />
        </TwitterShareButton>

        <EmailShareButton url={props.webUrl} subject="#CSCI_571_NewsApp">
          <EmailIcon round={true} />
        </EmailShareButton>
      </Modal.Body>
    </Modal>
  );
};

export default ShareModal;
