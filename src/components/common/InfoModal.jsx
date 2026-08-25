import React from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";

const InfoModal = ({ show, title, content, callbackFn }) => {
  return (
    <Modal
      show={show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="d-flex justify-content-center">
              <Form.Label>{content}</Form.Label>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button
                variant="info"
                type="button"
                className="my-3 w-100"
                onClick={callbackFn}
              >
                CLOSE
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default InfoModal;
