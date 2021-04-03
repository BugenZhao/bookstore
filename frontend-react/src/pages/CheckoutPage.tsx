import { Header } from "../components/Header";
import { Main } from "./common/Main";
import { Body } from "./common/Body";
import { CartView } from "../views/CartView";
import { PaymentView } from "../views/PaymentView";
import { AddressView } from "../views/AddressView";

function CheckoutMain() {
  return (
    <div>
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
            >
              Checkout
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
        <CheckoutMain />
      </Main>
    </Body>
  );
}
