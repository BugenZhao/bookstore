import { useContext } from 'react';
import _ from 'lodash';
import { BookContext, BOOKS } from '../App';

function CartItem({
  book,
}) {
  return (
    <li className="list-group-item d-flex justify-content-between lh-sm">
      <div>
        <h6 className="my-0">{book.name}</h6>
        <small className="text-muted">{book.author}</small>
      </div>
      <span className="text-muted">¥{book.price}</span>
    </li>
  );
}

export function CartView() {
  const [_bc, _sbc, cart, _addToCart] = useContext(BookContext);

  const books = _(cart).map((id) => BOOKS[id]);
  const sumPrice = _(books).map((book) => book.price).sum();
  const discount = Math.min(100.0, sumPrice * 0.3);
  const totalPrice = sumPrice - discount;
  const cartItems = books.map((b) => <CartItem book={b} />).value();

  return (
    <div>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Your cart</span>
        <span className="badge bg-secondary rounded-pill">{books.size()}</span>
      </h4>
      <ul className="list-group mb-3">
        {cartItems}
        <li className="list-group-item d-flex justify-content-between lh-sm">
          <span>Discount</span>
          <span className="text-danger fw-bold"> -¥{discount.toFixed(2)}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Total</span>
          <span className="fw-bold">¥{totalPrice.toFixed(2)}</span>
        </li>
      </ul>
    </div>
  );
}
