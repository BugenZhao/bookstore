import { Link } from 'react-router-dom';

export function BookCard({
  book,
  withLink,
}) {
  const path = `/detail/${book.id}`;

  return (
    <div className="card shadow-sm">
      <img src={book.image} alt="" className="card-img-top" />
      {withLink ?
        <Link to={path} className="stretched-link">
          <span className="visually-hidden">Details</span>
        </Link>
        : null}
      <div className="card-body">
        <h5 className="card-title text-truncate">{book.name}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="card-subtitle text-danger">¥{book.price}</h6>
          <small className="card-subtitle text-muted">{book.inventory}+</small>
        </div>
      </div>
    </div>
  );
}
