import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const CustomModal = ({
  children,
  header,
  FooterChildren,
  ButtonIcon,
  handleClose,
  handleShow,
  show,
}) => {
  return (
    <>
      <Button variant="link dark" onClick={handleShow}>
        {ButtonIcon}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>{FooterChildren}</Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal;
