import React from "react";
import Modal from "react-bootstrap/Modal";

// import "./modal.css";

const CustomModal = ({
  children,
  header,
  FooterChildren,
  handleClose,
  show,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="example-modal-sizes-title-sm"
        centered
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
