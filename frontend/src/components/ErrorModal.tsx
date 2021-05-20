import { PropsWithChildren, ReactNode } from "react";
import { Modal, Button } from "react-bootstrap";

export function ErrorModal({
  modalShow,
  setModalShow,
  title = "Error",
  children,
}: PropsWithChildren<{
  modalShow: boolean;
  setModalShow: (b: boolean) => void;
  title?: ReactNode;
}>) {
  return (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setModalShow(false)}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
