import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Book } from "../services/book";

export function BookCard({
  book,
  withLink = true,
}: {
  book: Book;
  withLink: boolean;
}) {
  const path = `/detail/${book.id}`;

  return (
    <Card>
      {withLink ? (
        <Card.Link className="stretched-link" as={Link} to={path} />
      ) : null}
      <Card.Img variant="top" src={book.image} />
      <Card.Body>
        <Card.Title className="text-truncate">{book.name}</Card.Title>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Subtitle className="text-danger" as="h6">
            ¥{book.price}
          </Card.Subtitle>
          <Card.Subtitle className="text-muted" as="small">
            {book.inventory}
          </Card.Subtitle>
        </div>
      </Card.Body>
    </Card>
  );
}
