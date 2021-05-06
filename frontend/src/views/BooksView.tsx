import { createContext, useContext, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import _ from "lodash";
import { BookCard } from "../components/BookCard";
import { SearchPageParams } from "../routes";
import { Fade } from "react-awesome-reveal";
import { Row, Spinner } from "react-bootstrap";
import { useBooks } from "../services/book";

const PER_PAGE = 12;

function Pagination() {
  const { total, page, setPage } = useContext(GalleryContext);
  const totalPage = Math.ceil(total / PER_PAGE);

  const pages = _(_.range(1, totalPage + 1))
    .map((p) => (
      <li className={`page-item ${p === page ? "active" : ""}`} key={p}>
        <button className="page-link" onClick={() => setPage(p)}>
          {p}
        </button>
      </li>
    ))
    .value();

  return (
    <div className="py-5" id="footer">
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page - 1)}>
              Previous
            </button>
          </li>
          {pages}
          <li className={`page-item ${page === totalPage ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setPage(page + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Books() {
  const { setTotal, page } = useContext(GalleryContext);
  const keyword = useRouteMatch<SearchPageParams>().params.keyword ?? "";
  const { books: allBooks } = useBooks();

  const allBooksIter = _(allBooks).filter((book) =>
    _(book).values().join().includes(keyword)
  );
  useEffect(() => setTotal(allBooksIter.size()));

  if (!allBooks) {
    return (
      <Row className="justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Row>
    );
  }

  const booksThisPage = allBooksIter
    .map((book) => (
      <div key={`book${book.id}`} className="col">
        <BookCard book={book} withLink />
      </div>
    ))
    .drop((page - 1) * PER_PAGE)
    .take(PER_PAGE)
    .value();

  return (
    <div
      className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-3"
      id="books"
    >
      <Fade cascade damping={0.025} triggerOnce>
        {booksThisPage}
      </Fade>
    </div>
  );
}

type GalleryContextType = {
  total: number;
  setTotal: (n: number) => void;
  page: number;
  setPage: (n: number) => void;
};

const GalleryContext = createContext<GalleryContextType>(null!);

export function BooksView() {
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  return (
    <GalleryContext.Provider value={{ total, setTotal, page, setPage }}>
      <div>
        <Books />
        <Pagination />
      </div>
    </GalleryContext.Provider>
  );
}
