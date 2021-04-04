import { createContext, useContext, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { SelectContextType } from "../services";

type AddressContextType = SelectContextType<number>;
const AddressContext = createContext<AddressContextType>(null!);

export type Address = {
  id: number;
  name: string;
  tag: string;
  phone: string;
  address: string;
};

function AddressItem({ address }: { address: Address }) {
  const bgClass = address.tag === "Default" ? "bg-secondary" : "bg-success";
  const { selected, setSelected } = useContext(AddressContext);

  return (
    <button
      onClick={() => setSelected(address.id)}
      className={`list-group-item list-group-item-action ${
        selected === address.id ? "active" : ""
      }`}
    >
      <div className="d-flex w-100 justify-content-between align-items-center">
        <h5 className="mb-1">{address.name}</h5>
        <span className={`badge ${bgClass} rounded-pill`}>{address.tag}</span>
      </div>
      <p className="mb-0 small">{address.phone}</p>
      <p className="mb-0">{address.address}</p>
    </button>
  );
}

function AddNewAddressItem() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button
        className="list-group-item list-group-item-action"
        onClick={() => setModalShow(true)}
      >
        <span className="text-muted">Add a new address...</span>
      </button>
      <Modal
        show={modalShow}
        size="lg"
        onHide={() => setModalShow(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control placeholder="Enter full name" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Phone Number
              </Form.Label>
              <Col sm={9}>
                <Form.Control placeholder="Enter phone number" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Address
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="textarea"
                  placeholder="Enter address"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Set as default" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => setModalShow(false)}
            type="submit"
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function AddressView() {
  const [selected, setSelected] = useState(0);

  return (
    <AddressContext.Provider value={{ selected, setSelected }}>
      <div>
        <h4 className="mb-3">Shipping Address</h4>
        <div>
          <div className="list-group">
            <AddressItem
              address={{
                id: 0,
                name: "Bugen Zhao",
                tag: "Default",
                phone: "+86 155 2121 2121",
                address: "1234 Main St., Minhang, Shanghai, China",
              }}
            />
            <AddressItem
              address={{
                id: 1,
                name: "Alice Cook",
                tag: "Home",
                phone: "+1 802 812 3456",
                address: "4321 Home St., Cupertino, CA, United States",
              }}
            />
            <AddressItem
              address={{
                id: 2,
                name: "Dave Jobs",
                tag: "School",
                phone: "+86 188 1234 5678",
                address: "9876 School St., Shanghai, China",
              }}
            />
            <AddNewAddressItem />
          </div>
        </div>
      </div>
    </AddressContext.Provider>
  );
}
