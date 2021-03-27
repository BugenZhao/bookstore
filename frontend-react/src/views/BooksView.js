import { useContext } from 'react';
import _ from 'lodash';
import { BookCard } from '../components/BookCard';
import { StoreContext, BooksContext } from "../services";

function Books({
  keyword = "",
}) {
  const [bookCount, _setBookCount] = useContext(StoreContext);
  const BOOKS = useContext(BooksContext);

  return _(BOOKS)
    .filter((book) => book.name.includes(keyword))
    .map((book) => <div key={`book${book.id}`} className="col">
      <BookCard book={book} withLink={true} />
    </div>
    ).take(bookCount).value();
}
export function BooksView({
  keyword = "",
}) {
  return (
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-3" id="books">
      <Books keyword={keyword}></Books>
    </div>
  );
}
