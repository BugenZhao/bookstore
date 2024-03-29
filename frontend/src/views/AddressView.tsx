import { createContext, useContext, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { SelectContextType } from "../services";

type AddressContextType = SelectContextType<Address | undefined> & {
  modalShow: boolean;
  setModalShow: (b: boolean) => void;
};
const AddressContext = createContext<AddressContextType>(undefined!);

export type NewAddressData = {
  name: string;
  phone: string;
  address: string;
};

export type Address = NewAddressData & {
  id: number;
  tag: string;
};

function AddressItem({ address }: { address: Address }) {
  const bgClass = address.tag === "Default" ? "bg-secondary" : "bg-success";
  const { selected, setSelected } = useContext(AddressContext);

  return (
    <button
      onClick={() => setSelected(address)}
      className={`list-group-item list-group-item-action ${
        (selected?.id ?? 0) === address.id ? "active" : ""
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

function AddNewAddressModal() {
  const { modalShow, setModalShow } = useContext(AddressContext);
  const { register, handleSubmit } = useForm<NewAddressData>();

  return (
    <Modal
      show={modalShow}
      size="lg"
      onHide={() => setModalShow(false)}
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add a New Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit((data) => {
            alert(JSON.stringify(data));
            setModalShow(false);
          })}
          id="add-new-address-form"
        >
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Name
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                placeholder="Enter full name"
                required
                {...register("name")}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Phone Number
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                placeholder="Enter phone number"
                required
                {...register("phone")}
              />
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
                {...register("address")}
              />
            </Col>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Set as default"
              id="set-as-default"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" form="add-new-address-form">
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function AddNewAddressItem() {
  const { setModalShow } = useContext(AddressContext);
  return (
    <>
      <button
        className="list-group-item list-group-item-action"
        onClick={() => setModalShow(true)}
      >
        <span className="text-muted">Add a new address...</span>
      </button>
    </>
  );
}

export function AddressView() {
  const [selected, setSelected] = useState<Address>();
  const [modalShow, setModalShow] = useState(false);

  return (
    <AddressContext.Provider
      value={{ selected, setSelected, modalShow, setModalShow }}
    >
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
            <AddNewAddressModal />
          </div>
        </div>
      </div>
    </AddressContext.Provider>
  );
}
