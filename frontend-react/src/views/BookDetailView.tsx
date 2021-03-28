import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Book, useStore } from "../services";

export function BookDetailView({ book }: { book: Book }) {
  const { addToCart } = useStore();

  return (
    <div>
      <h1 className="h4 my-3">{book.name}</h1>
      <div className="mb-3">
        <dl className="row">
          <dt className="col-sm-3">Author</dt>
          <dd className="col-sm-9">{book.author}</dd>

          <dt className="col-sm-3">Press</dt>
          <dd className="col-sm-9">Unknown Press</dd>

          <dt className="col-sm-3">Category</dt>
          <dd className="col-sm-9">{book.type}</dd>

          <dt className="col-sm-3">Stock</dt>
          <dd className="col-sm-9">{book.inventory}+</dd>

          <dt className="col-sm-3">Price</dt>
          <dd className="col-sm-9 text-danger fw-bold">¥{book.price}</dd>

          <dt className="col-sm-3">Introduction</dt>
          <dd className="col-sm-9">{book.description}</dd>
        </dl>
        <div className="my-3">
          <div className="d-flex justify-content-end">
            <div
              className="btn-group btn-group-lg col-12 col-xl-6 col-lg-8"
              role="group"
            >
              <OverlayTrigger
                placement="left"
                trigger="click"
                overlay={
                  <Tooltip id="add-tooltip">
                    Added!
                  </Tooltip>
                }
              >
                <button
                  type="button"
                  className="btn btn-outline-danger w-100"
                  onClick={() => {
                    addToCart(book.id.toString());
                  }}
                >
                  Add to Cart
                </button>
              </OverlayTrigger>

              <Link className="btn btn-danger w-100" to="/checkout">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
