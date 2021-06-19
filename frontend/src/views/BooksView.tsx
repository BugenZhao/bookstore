import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import _ from "lodash";
import { BookCard } from "../components/BookCard";
import { HomeOrSearchPageParams } from "../routes";
import { Fade } from "react-awesome-reveal";
import { Row, Spinner } from "react-bootstrap";
import { useAllBooks, useSearchBooks } from "../services/book";
import classNames from "classnames";

const PER_PAGE = 12;

function useParams() {
  const {
    page: pageStr,
    keyword,
  } = useRouteMatch<HomeOrSearchPageParams>().params;
  return {
    page: parseInt(pageStr ?? "", 10) || 1,
    keyword,
  };
}

function Pagination() {
  const { total, pathBase } = useContext(GalleryContext);
  const { page } = useParams();
  const history = useHistory();
  const totalPage = Math.ceil(total / PER_PAGE);

  const goToPage = (newPage: number) => {
    history.push(pathBase + `/${newPage}`);
  };

  const pages = _(_.range(1, totalPage + 1))
    .map((p) => (
      <li className={`page-item ${p === page ? "active" : ""}`} key={p}>
        <button className="page-link" onClick={() => goToPage(p)}>
          {p}
        </button>
      </li>
    ))
    .value();

  return (
    <div className="py-5" id="footer">
      <nav>
        <ul className="pagination justify-content-center">
          <li
            className={classNames(
              "page-item",
              page === 1 ? "disabled" : undefined
            )}
          >
            <button className="page-link" onClick={() => goToPage(page - 1)}>
              Previous
            </button>
          </li>
          {pages}
          <li
            className={classNames(
              "page-item",
              page === totalPage ? "disabled" : undefined
            )}
          >
            <button className="page-link" onClick={() => goToPage(page + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Books({
  useBooks,
}: PropsWithChildren<{
  useBooks: typeof useAllBooks;
}>) {
  const { setTotal } = useContext(GalleryContext);
  const { page } = useParams();
  const { books, total } = useBooks(page - 1, PER_PAGE);

  useEffect(() => setTotal(total ?? 0)); // todo: backend search

  if (!books) {
    return (
      <Row className="justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Row>
    );
  }

  const booksThisPage = (books ?? []).map((book) => (
    <div key={`book${book.id}`} className="col">
      <BookCard book={book} withLink />
    </div>
  ));

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
  pathBase: string;
};

const GalleryContext = createContext<GalleryContextType>(null!);

export function BooksView({
  type,
}: PropsWithChildren<{ type: "search" | "home" }>) {
  const [total, setTotal] = useState(0);
  const { keyword } = useParams();

  const { pathBase, useBooks } = (() => {
    switch (type) {
      case "search":
        return {
          pathBase: `/search/${keyword}`,
          useBooks: (page: number, size: number) =>
            useSearchBooks(keyword ?? "", page, size),
        };
      case "home":
        return { pathBase: `/${type}`, useBooks: useAllBooks };
    }
  })();

  return (
    <GalleryContext.Provider value={{ total, setTotal, pathBase }}>
      <div>
        <Books useBooks={useBooks} />
        <Pagination />
      </div>
    </GalleryContext.Provider>
  );
}
