import { ButtonGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Book } from "../services/book";
import { putCart, useCart } from "../services/cart";

export function BookDetailView({ book }: { book: Book }) {
  const { revalidate } = useCart();

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ height: "100%" }}
    >
      <div>
        <h1 className="h2 my-3">{book.name}</h1>
        <div className="mb-3">
          <dl className="row">
            <dt className="col-sm-3">Author</dt>
            <dd className="col-sm-9">{book.author}</dd>

            <dt className="col-sm-3">Press</dt>
            <dd className="col-sm-9">Unknown Press</dd>

            <dt className="col-sm-3">ISBN</dt>
            <dd className="col-sm-9">{book.isbn}</dd>

            <dt className="col-sm-3">Category</dt>
            <dd className="col-sm-9">{book.type}</dd>

            <dt className="col-sm-3">Stock</dt>
            <dd className="col-sm-9">{book.inventory}+</dd>

            <dt className="col-sm-3">Price</dt>
            <dd className="col-sm-9 text-danger fw-bold">¥{book.price}</dd>

            <dt className="col-sm-3">Introduction</dt>
            <dd className="col-sm-9">{book.description}</dd>
          </dl>
        </div>
      </div>
      <div className="my-3">
        <div className="d-flex justify-content-end">
          <ButtonGroup className="col-12 col-xl-6 col-lg-8" size="lg">
            <Button
              variant="outline-danger"
              className="w-100"
              onClick={async () => {
                await putCart(book.id.toString());
                await revalidate();
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline-danger"
              className="w-100"
              as={Link}
              to="/checkout"
            >
              Checkout
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
