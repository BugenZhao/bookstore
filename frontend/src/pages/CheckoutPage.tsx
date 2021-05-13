import { Header } from "../components/Header";
import { Main } from "./common/Main";
import { Body } from "./common/Body";
import { CartView } from "../views/CartView";
import { PaymentView } from "../views/PaymentView";
import { AddressView } from "../views/AddressView";
import { Fade } from "react-awesome-reveal";
import { checkout, useCart } from "../services/cart";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

function CheckoutMain() {
  const { cartCount, revalidate } = useCart();
  const [modalShow, setModalShow] = useState(false);
  const [processing, setProcessing] = useState(false);

  const noBook = cartCount === 0;

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
            <OverlayTrigger
              overlay={
                <Tooltip id="no-book-tooltip">
                  There's no book in the cart
                </Tooltip>
              }
              placement="bottom"
              show={noBook}
            >
              <button
                className="btn btn-primary btn-lg col-12 col-lg-3"
                type="submit"
                disabled={processing || noBook}
                onClick={async () => {
                  setProcessing(true);
                  const result = await checkout();
                  await revalidate();
                  if (result.ok) {
                    setModalShow(true);
                  }
                  setProcessing(false);
                }}
              >
                {processing ? "Processing..." : "Checkout"}
              </button>
            </OverlayTrigger>
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
