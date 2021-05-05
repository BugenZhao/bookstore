import { Header } from "../components/Header";
import { Main } from "./common/Main";
import { Body } from "./common/Body";
import { CartView } from "../views/CartView";
import { PaymentView } from "../views/PaymentView";
import { AddressView } from "../views/AddressView";
import { Fade } from "react-awesome-reveal";
import { checkout, useCart } from "../services/cart";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

function CheckoutMain() {
  const { revalidate } = useCart();
  const [modalShow, setModalShow] = useState(false);
  const [processing, setProcessing] = useState(false);

  return (
    <div>
      <Modal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setProcessing(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Checkout Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Go to <Link to="/orders">My Orders</Link> to check the order.
        </Modal.Body>
      </Modal>
      <div className="row">
        <div className="col-md-6 col-lg-5 order-md-last">
          <CartView />
        </div>
        <div className="col-md-6 col-lg-7">
          <AddressView />
          <hr className="my-4" />
          <PaymentView />
          <hr className="my-4" />
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-primary btn-lg col-12 col-lg-3"
              type="submit"
              disabled={processing}
              onClick={async () => {
                setProcessing(true);
                await checkout();
                await revalidate();
                setModalShow(true);
              }}
            >
              {processing ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CheckoutPage() {
  return (
    <Body>
      <Header active="cart" />
      <Main py={5}>
        <Fade>
          <CheckoutMain />
        </Fade>
      </Main>
    </Body>
  );
}
