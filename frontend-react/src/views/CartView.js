import { useContext } from 'react';
import _ from 'lodash';
import { BooksContext, StoreContext } from "../services";

function CartItem({
  book,
  count,
}) {
  return (
    <li className="list-group-item d-flex justify-content-between lh-sm">
      <div>
        <h6 className="my-0">{book.name}</h6>
        <small className="text-muted">{book.author}</small>
      </div>
      <div>
        <span className="text-muted">¥{book.price}</span>
        {count > 1 ? (<span> x{count}</span>) : null}
      </div>
    </li>
  );
}

export function CartView() {
  const [_bc, _sbc, cart, _addToCart] = useContext(StoreContext);
  const BOOKS = useContext(BooksContext);

  const booksMap = _(cart).countBy((i) => i).toPairs().map(([i, c]) => [BOOKS[i], c]);
  
  const sumPrice = booksMap.map(([b, c]) => b.price * c).sum();
  const discount = Math.min(100.0, sumPrice * 0.3);
  const totalPrice = sumPrice - discount;

  const cartItems = booksMap.map(([b, c]) => <CartItem book={b} count={c} />).value();

  return (
    <div>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Your cart</span>
        <span className="badge bg-secondary rounded-pill">{cart.length}</span>
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
