import React from "react";
import Modal from "react-bootstrap/Modal";
import Classes from "./conformModal.module.css";
import Button from "react-bootstrap/Button";

export default function ConformModal(props) {
  return (
    <Modal
      show={props.shows}
      onHide={props.handleClose}
      dialogClassName="my-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex">
          <img src={props.img} alt="move" width="130px" height="130px" />
          <div className={Classes.contnt}>
            <h5 className={Classes.title}>{props.title}</h5>
            <p>{props.body}</p>
          </div>
        </div>
        <div className="row btnPad">
          <div className="col-md-6">
            <div className={Classes.remv} onClick={props.remove}>
              REMOVE
            </div>
          </div>
          <div className="col-md-6">
            <div className={Classes.movWish} onClick={props.movWish}>
              MOVE TO WISHLIST
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
