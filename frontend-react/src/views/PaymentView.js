import { Link } from 'react-router-dom';

export function PaymentView() {
  return (
    <div>
      <h4 className="mb-3">Payment</h4>

      <div className="row gy-2">
        <div className="col-lg-5 col-xxl-4">
          <div className="list-group">
            <Link to="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <span>PayPal</span>
              </div>
            </Link>
            <Link to="#" className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <span>WeChat Pay</span>
                <span className="badge bg-success rounded-pill">Recommended</span>
              </div>
            </Link>
            <Link to="#" className="list-group-item list-group-item-action"
            >
              <div className="d-flex w-100 justify-content-between align-items-center">
                <span>Alipay</span>
                <span className="badge bg-secondary rounded-pill">Last used</span>
              </div>
            </Link>
            <Link to="#" className="list-group-item list-group-item-action active">
              <span className="">Credit card</span>
            </Link>
          </div>
        </div>

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


      </div>
    </div>
  );
}
