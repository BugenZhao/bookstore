import { PropsWithChildren } from "react";
import _ from "lodash";
import { Book } from "../services/book";
import { Link } from "react-router-dom";
import { Badge, Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { deleteFromCart, emptyCart, useCart } from "../services/cart";

function CartItem({ book, count }: { book: Book; count: number }) {
  const link = `/detail/${book.id}`;
  const { revalidate } = useCart();

  return (
    <ListGroup.Item
      as={Link}
      to={link}
      style={{ color: "inherit", textDecoration: "inherit" }}
      action
    >
      <Row className="d-flex justify-content-between">
        <Col xs={3}>
          <Image src={book.image} fluid></Image>
        </Col>
        <Col className="d-flex align-items-center">
          <div className="me-auto">
            <h6 className="mb-0">{book.name}</h6>
            <small className="text-muted">{book.author}</small>
          </div>
          <div className="me-3">
            <span className="h5">¥{book.price}</span>
            {count > 1 ? <span className="text-muted"> x{count}</span> : null}
          </div>
          <Badge
            pill
            as={Button}
            variant="danger"
            onClick={async (e) => {
              e.preventDefault();
              await deleteFromCart(book.id.toString());
              await revalidate();
            }}
          >
            —
          </Badge>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

function Summary({
  title,
  value,
}: PropsWithChildren<{
  title: "Discount" | "Total";
  value: number;
}>) {
  const textStyle = title === "Discount" ? "text-danger" : "fw-bold";
  const valuePrefix = title === "Discount" ? "-¥" : "¥";

  return (
    <ListGroup.Item>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <span className="h6">{title}</span>
        </div>
        <div>
          <span className={`h5 ${textStyle}`}>
            {valuePrefix}
            {value.toFixed(2)}
          </span>
        </div>
      </div>
    </ListGroup.Item>
  );
}

export function CartView() {
  const { books, cartCount, discount, total, revalidate } = useCart();

  const cartItems = _(books)
    .map((b) => <CartItem book={b.book} count={b.count} key={b.book.id} />)
    .value();

  return (
    <div>
      <h4 className="d-flex align-items-center mb-3">
        <span className="text-muted me-2">My cart</span>
        <Badge pill bg="secondary" className="me-auto">
          {cartCount}
        </Badge>
        {cartCount > 0 ? (
          <Badge
            pill
            as={Button}
            variant="danger"
            onClick={async () => {
              await emptyCart();
              await revalidate();
            }}
          >
            Clear
          </Badge>
        ) : null}
      </h4>
      <ul className="list-group mb-3">
        {cartItems}
        <Summary title="Discount" value={discount} />
        <Summary title="Total" value={total} />
      </ul>
    </div>
  );
}
