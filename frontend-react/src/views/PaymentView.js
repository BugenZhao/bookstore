import { Link } from 'react-router-dom';

function PaymentMethod({
  name,
  children,
  active = false,
}) {
  return (
    <Link to="#" className={`list-group-item list-group-item-action ${active ? "active" : ""}`}>
      <div className="d-flex w-100 justify-content-between align-items-center">
        <span>{name}</span>
        {children}
      </div>
    </Link>
  )
}


function CreditCardForm() {
  return (
    <div className="col">
      <div className="row gy-2">
        <div className="col-md-6">
          <label htmlFor="cc-name" className="form-label">Name on card</label>
          <input type="text" className="form-control" id="cc-name" placeholder="" required="" />
        </div>

        <div className="col-md-6">
          <label htmlFor="cc-number" className="form-label">Card number</label>
          <input type="text" className="form-control" id="cc-number" placeholder=""
            required="" />
        </div>

        <div className="col-md-6">
          <label htmlFor="cc-expiration" className="form-label">Expiration</label>
          <input type="text" className="form-control" id="cc-expiration" placeholder=""
            required="" />
        </div>

        <div className="col-md-6">
          <label htmlFor="cc-cvv" className="form-label">CVV</label>
          <input type="text" className="form-control" id="cc-cvv" placeholder="" required="" />
        </div>
      </div>

    </div>
  );
}

export function PaymentView() {
  return (
    <div>
      <h4 className="mb-3">Payment</h4>

      <div className="row gy-2">
        <div className="col-lg-5 col-xxl-4">
          <div className="list-group">
            <PaymentMethod name="PayPal" />
            <PaymentMethod name="WeChat Pay" >
              <span className="badge bg-success rounded-pill">Recommended</span>
            </PaymentMethod>
            <PaymentMethod name="Alipay" >
              <span className="badge bg-secondary rounded-pill">Last used</span>
            </PaymentMethod>
            <PaymentMethod name="Credit card" active={true} />
          </div>
        </div>

        <CreditCardForm />
      </div>
    </div>
  );
}
