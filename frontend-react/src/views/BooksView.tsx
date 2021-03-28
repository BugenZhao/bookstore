import { createContext, useContext, useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import _ from "lodash";
import { BookCard } from "../components/BookCard";
import { BooksContext } from "../services";
import { SearchPageParams } from "../routes";

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
  const { BOOKS } = useContext(BooksContext);
  const { setTotal, page } = useContext(GalleryContext);
  const keyword = useRouteMatch<SearchPageParams>().params.keyword ?? "";

  const allBooksIter = _(BOOKS)
    .filter((book) => _(book).values().join().includes(keyword))
    .map((book) => (
      <div key={`book${book.id}`} className="col">
        <BookCard book={book} withLink={true} />
      </div>
    ));

  const books = allBooksIter
    .drop((page - 1) * PER_PAGE)
    .take(PER_PAGE)
    .value();

  useEffect(() => setTotal(allBooksIter.size()));

  return (
    <div
      className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-3"
      id="books"
    >
      {books}
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
        <Books></Books>
        <Pagination />
      </div>
    </GalleryContext.Provider>
  );
}
