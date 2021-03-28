import { createContext, PropsWithChildren, useContext, useState } from "react";
import { SelectContextType } from "../services";

const PaymentContext = createContext<SelectContextType<string>>(null!);

function PaymentMethod({
  name,
  children,
}: PropsWithChildren<{
  name: string;
}>) {
  const { selected, setSelected } = useContext(PaymentContext);

  return (
    <button
      onClick={() => setSelected(name)}
      className={`list-group-item list-group-item-action ${
        selected === name ? "active" : ""
      }`}
    >
      <div className="d-flex w-100 justify-content-between align-items-center">
        <span>{name}</span>
        {children}
      </div>
    </button>
  );
}

function CreditCardForm() {
  return (
    <div className="col">
      <div className="row gy-2">
        <div className="col-md-6">
          <label htmlFor="cc-name" className="form-label">
            Name on card
          </label>
          <input
            type="text"
            className="form-control"
            id="cc-name"
            placeholder=""
            required={true}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="cc-number" className="form-label">
            Card number
          </label>
          <input
            type="text"
            className="form-control"
            id="cc-number"
            placeholder=""
            required={true}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="cc-expiration" className="form-label">
            Expiration
          </label>
          <input
            type="text"
            className="form-control"
            id="cc-expiration"
            placeholder=""
            required={true}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="cc-cvv" className="form-label">
            CVV
          </label>
          <input
            type="text"
            className="form-control"
            id="cc-cvv"
            placeholder=""
            required={true}
          />
        </div>
      </div>
    </div>
  );
}

export function PaymentView() {
  const [selected, setSelected] = useState("Credit card");

  return (
    <PaymentContext.Provider value={{ selected, setSelected }}>
      <div>
        <h4 className="mb-3">Payment</h4>
        <div className="row gy-2">
          <div className="col-lg-5 col-xxl-4">
            <div className="list-group">
              <PaymentMethod name="PayPal" />
              <PaymentMethod name="WeChat Pay">
                <span className="badge bg-success rounded-pill">
                  Recommended
                </span>
              </PaymentMethod>
              <PaymentMethod name="Alipay" />
              <PaymentMethod name="Credit card">
                <span className="badge bg-secondary rounded-pill">
                  Last used
                </span>
              </PaymentMethod>
            </div>
          </div>

          {selected === "Credit card" ? (
            <CreditCardForm />
          ) : (
            <div className="col">
              You'll be redirected to {selected} after clicking "Checkout".
            </div>
          )}
        </div>
      </div>
    </PaymentContext.Provider>
  );
}
