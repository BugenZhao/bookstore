import { Link } from 'react-router-dom';
import { BookCard } from '../components/BookCard';
import { Header } from '../components/Header';
import { BookDetailView } from '../views/BookDetailView';
import { BOOKS } from '../App';
import { Main } from "./common/Main";
import { Body } from "./common/Body";

export function DetailPage(props) {
  const id = props.match.params.id;

  return (
    <Body>
      <Header active="detail" />
      <Main py={5}>
        <DetailMain id={id} />
      </Main>
    </Body>
  );
}

function DetailMain({
  id,
}) {
  const book = BOOKS[id];

  return (
    <div>
      <nav>
        <ol className="breadcrumb h6">
          <li className="breadcrumb-item"><Link to="/home">Books</Link></li>
          <li className="breadcrumb-item active">{book.name}</li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-md-4">
          <BookCard book={book} withLink={false} />
        </div>
        <div className="col-md-8">
          <BookDetailView book={book} />
        </div>
      </div>
    </div>
  );
}
