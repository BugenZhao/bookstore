import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import { BookCard } from "../components/BookCard";
import { Header } from "../components/Header";
import { BookDetailView } from "../views/BookDetailView";
import { Main } from "./common/Main";
import { Body } from "./common/Body";
import { Book } from "../services/BooksContext";
import { Fade } from "react-awesome-reveal";
import { Row, Spinner } from "react-bootstrap";
import { useFetch } from "../services";

export function DetailPage(
  props: RouteComponentProps<{
    id: string;
  }>
) {
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

function DetailMain({ id }: { id: string }) {
  const { data: book } = useFetch<Book>(`/books/${id}`);

  if (!book) {
    return (
      <div>
        <BreadCrumb />
        <Row className="justify-content-center mt-5">
          <Spinner animation="border" variant="primary" />
        </Row>
      </div>
    );
  }

  return (
    <div>
      <BreadCrumb name={book.name} />
      <Fade>
        <Row>
          <div className="col-md-5 col-lg-4 align-self-center">
            <BookCard book={book} withLink={false} />
          </div>
          <div className="col-md-7 col-lg-8">
            <BookDetailView book={book} />
          </div>
        </Row>
      </Fade>
    </div>
  );
}

function BreadCrumb({ name }: { name?: string }) {
  const history = useHistory();

  return (
    <nav>
      <ol className="breadcrumb h6">
        <li className="breadcrumb-item">
          <Link to="#" className="" onClick={() => history.goBack()}>
            Books
          </Link>
        </li>
        {name ? (
          <li className="breadcrumb-item active">{name}</li>
        ) : (
          <li className="breadcrumb-item">...</li>
        )}
      </ol>
    </nav>
  );
}
