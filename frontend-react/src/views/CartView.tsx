import { PropsWithChildren, useContext } from "react";
import _ from "lodash";
import { Book, BooksContext } from "../services/BooksContext";
import { useStore } from "../services/StoreContext";
import { Link } from "react-router-dom";
import { Badge, Col, Image, ListGroup, Row } from "react-bootstrap";

function CartItem({ book, count }: { book: Book; count: number }) {
  const link = `/detail/${book.id}`;

  return (
    <ListGroup.Item
      as={Link}
      to={link}
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      <Row className="justify-content-between">
        <Col sm={3}>
          <Image src={book.image} fluid={true}></Image>
        </Col>
        <Col className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="my-0">{book.name}</h6>
            <small className="text-muted">{book.author}</small>
          </div>
          <div>
            <span className="h5">¥{book.price}</span>
            {count > 1 ? <span className="text-muted"> x{count}</span> : null}
          </div>
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
  const { cart } = useStore();
  const { BOOKS } = useContext(BooksContext);

  const booksMap = _(cart)
    .countBy((i) => i)
    .toPairs()
    .map(([i, c]) => [BOOKS[i], c] as const);

  const sumPrice = booksMap.map(([b, c]) => b.price * c).sum();
  const discount = Math.min(100.0, sumPrice * 0.3);
  const totalPrice = sumPrice - discount;

  const cartItems = booksMap
    .map(([b, c]) => <CartItem book={b} count={c} key={b.id} />)
    .value();

  return (
    <div>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Your cart</span>
        <Badge pill={true} bg="secondary">
          {cart.length}
        </Badge>
      </h4>
      <ul className="list-group mb-3">
        {cartItems}
        <Summary title="Discount" value={discount} />
        <Summary title="Total" value={totalPrice} />
      </ul>
    </div>
  );
}
