import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import { BookCard } from "../components/BookCard";
import { Header } from "../components/Header";
import { BookDetailView } from "../views/BookDetailView";
import { Main } from "./common/Main";
import { Body } from "./common/Body";
import { useContext } from "react";
import { BooksContext } from "../services/BooksContext";
import { Fade } from "react-awesome-reveal";
import { Row } from "react-bootstrap";

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
  const { BOOKS } = useContext(BooksContext);
  const book = BOOKS[id];
  const history = useHistory();

  return (
    <div>
      <nav>
        <ol className="breadcrumb h6">
          <li className="breadcrumb-item">
            <Link to="#" className="" onClick={() => history.goBack()}>
              Books
            </Link>
          </li>
          <li className="breadcrumb-item active">{book.name}</li>
        </ol>
      </nav>
      <Fade>
        <Row>
          <div className="col-md-6 col-lg-4 align-self-center">
            <BookCard book={book} withLink={false} />
          </div>
          <div className="col-md-6 col-lg-8">
            <BookDetailView book={book} />
          </div>
        </Row>
      </Fade>
    </div>
  );
}